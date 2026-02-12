import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { defaultLandingContent } from '../data/landingContent';
import {
    clearLandingContent,
    loadLandingContent,
    mergeLandingContent,
    saveLandingContent,
} from '../utils/landingStorage';
import { fetchLandingContent, saveLandingContentRemote } from '../utils/landingApi';
import { clearDashboardAuthed } from '../utils/authStorage';

const iconOptions = [
    { value: 'PlugZap', label: 'PlugZap' },
    { value: 'ShieldCheck', label: 'ShieldCheck' },
    { value: 'Sparkles', label: 'Sparkles' },
    { value: 'BarChart3', label: 'BarChart3' },
    { value: 'Sliders', label: 'Sliders' },
    { value: 'Smartphone', label: 'Smartphone' },
];

const cloneContent = (value) => {
    if (typeof structuredClone === 'function') {
        return structuredClone(value);
    }
    return JSON.parse(JSON.stringify(value));
};

const normalizeLines = (value) =>
    value
        .split('\n')
        .map((line) => line.trim());

const MAX_IMAGE_DIMENSION = 1400;
const IMAGE_QUALITY = 0.82;

const supportsWebp = () => {
    if (typeof document === 'undefined') {
        return false;
    }
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').startsWith('data:image/webp');
};

const getOutputType = () => (supportsWebp() ? 'image/webp' : 'image/jpeg');

const compressImageFile = (file) =>
    new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
            reject(new Error('Not an image'));
            return;
        }
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.onload = () => {
            const scale = Math.min(
                1,
                MAX_IMAGE_DIMENSION / img.width,
                MAX_IMAGE_DIMENSION / img.height
            );
            const targetWidth = Math.max(1, Math.round(img.width * scale));
            const targetHeight = Math.max(1, Math.round(img.height * scale));
            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                URL.revokeObjectURL(objectUrl);
                reject(new Error('Canvas not supported'));
                return;
            }
            const outputType = getOutputType();
            if (outputType === 'image/jpeg') {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
            const dataUrl = canvas.toDataURL(outputType, IMAGE_QUALITY);
            URL.revokeObjectURL(objectUrl);
            resolve(dataUrl);
        };
        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('Image load failed'));
        };
        img.src = objectUrl;
    });

const Field = ({ label, value, onChange, as = 'input', ...props }) => (
    <div className="dashboard-field">
        <label>{label}</label>
        {as === 'textarea' ? (
            <textarea
                value={value ?? ''}
                onChange={(event) => onChange(event.target.value)}
                {...props}
            />
        ) : (
            <input value={value ?? ''} onChange={(event) => onChange(event.target.value)} {...props} />
        )}
    </div>
);

const SelectField = ({ label, value, onChange, options }) => (
    <div className="dashboard-field">
        <label>{label}</label>
        <select value={value} onChange={(event) => onChange(event.target.value)}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

const ImageField = ({ label, value, onChange }) => {
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState('');
    const inputId = useId();

    const onFileChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }
        setFileName(file.name);
        setUploading(true);
        compressImageFile(file)
            .then((dataUrl) => {
                onChange(dataUrl ?? '');
                setUploading(false);
            })
            .catch(() => {
                const reader = new FileReader();
                reader.onload = () => {
                    onChange(reader.result?.toString() ?? '');
                    setUploading(false);
                };
                reader.onerror = () => {
                    setUploading(false);
                };
                reader.readAsDataURL(file);
            });
        event.target.value = '';
    };

    return (
        <div className="dashboard-field dashboard-image-field">
            <label>{label}</label>
            <div className="dashboard-image-preview">
                {value ? <img src={value} alt="Preview" /> : <span>Belum ada gambar</span>}
            </div>
            <div className="dashboard-image-controls">
                <div className="dashboard-file-field">
                    <input
                        id={inputId}
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        className="dashboard-file-input"
                    />
                    <label htmlFor={inputId} className="dashboard-file-button">
                        <span className="dashboard-file-icon" aria-hidden="true">
                            ⭳
                        </span>
                        Pilih File
                    </label>
                    <span className="dashboard-file-name">
                        {fileName ? fileName : 'Belum pilih file'}
                    </span>
                </div>
                <input
                    type="text"
                    value={value ?? ''}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder="Tempel URL gambar"
                />
                <button
                    className="dashboard-btn dashboard-btn--ghost"
                    type="button"
                    onClick={() => {
                        setFileName('');
                        onChange('');
                    }}
                >
                    Hapus
                </button>
                {uploading ? <span className="dashboard-note">Memproses...</span> : null}
            </div>
        </div>
    );
};
function Dashboard() {
    const [formData, setFormData] = useState(() => loadLandingContent());
    const [status, setStatus] = useState('Tersimpan');
    const [activeSection, setActiveSection] = useState('hero');
    const [toast, setToast] = useState(null);
    const toastTimerRef = useRef(null);
    const navigate = useNavigate();

    const sections = [
        { id: 'brand', label: 'Branding' },
        { id: 'hero', label: 'Hero' },
        { id: 'about', label: 'About' },
        { id: 'why', label: 'Kenapa Website' },
        { id: 'vs', label: 'VS Website' },
        { id: 'whatsapp', label: 'WhatsApp' },
        { id: 'services', label: 'Layanan' },
        { id: 'solutions', label: 'Kenapa Harus Kami' },
        { id: 'work', label: 'Cara Kami Bekerja' },
        { id: 'portfolio', label: 'Portofolio' },
        { id: 'pricing', label: 'Harga' },
        { id: 'contact', label: 'Contact CTA' },
        { id: 'footer', label: 'Footer' },
    ];

    useEffect(() => {
        let isMounted = true;
        fetchLandingContent()
            .then((data) => {
                const merged = mergeLandingContent(data);
                if (isMounted) {
                    setFormData(merged);
                }
                saveLandingContent(merged);
            })
            .catch(() => null);
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        setStatus('Menyimpan...');
        const timer = setTimeout(() => {
            saveLandingContent(formData);
            saveLandingContentRemote(formData)
                .then(() => {
                    setStatus('Tersimpan otomatis');
                })
                .catch(() => {
                    setStatus('Gagal menyimpan ke database');
                    setToast({
                        type: 'info',
                        message:
                            'Gagal menyimpan ke database. Periksa koneksi server atau konfigurasi DB.',
                    });
                    window.clearTimeout(toastTimerRef.current);
                    toastTimerRef.current = window.setTimeout(() => setToast(null), 3000);
                });
        }, 500);
        return () => clearTimeout(timer);
    }, [formData]);

    useEffect(() => () => window.clearTimeout(toastTimerRef.current), []);

    const updateByPath = (path, value) => {
        setFormData((prev) => {
            const next = cloneContent(prev);
            let cursor = next;
            for (let index = 0; index < path.length - 1; index += 1) {
                cursor = cursor[path[index]];
            }
            cursor[path[path.length - 1]] = value;
            return next;
        });
    };

    const addArrayItem = (path, item) => {
        setFormData((prev) => {
            const next = cloneContent(prev);
            let cursor = next;
            path.forEach((key) => {
                cursor = cursor[key];
            });
            cursor.push(item);
            return next;
        });
    };

    const removeArrayItem = (path, indexToRemove) => {
        setFormData((prev) => {
            const next = cloneContent(prev);
            let cursor = next;
            path.forEach((key) => {
                cursor = cursor[key];
            });
            cursor.splice(indexToRemove, 1);
            return next;
        });
    };

    const handleSaveNow = () => {
        saveLandingContent(formData);
        saveLandingContentRemote(formData)
            .then(() => {
                setStatus('Tersimpan');
                setToast({ type: 'success', message: 'Tersimpan! Perubahan berhasil disimpan.' });
            })
            .catch(() => {
                setStatus('Gagal menyimpan ke database');
                setToast({
                    type: 'info',
                    message:
                        'Gagal menyimpan ke database. Periksa koneksi server atau konfigurasi DB.',
                });
            })
            .finally(() => {
                window.clearTimeout(toastTimerRef.current);
                toastTimerRef.current = window.setTimeout(() => setToast(null), 2400);
            });
    };

    const handleReset = () => {
        setFormData(defaultLandingContent);
        clearLandingContent();
        saveLandingContent(defaultLandingContent);
        saveLandingContentRemote(defaultLandingContent)
            .then(() => {
                setStatus('Dikembalikan ke default');
                setToast({ type: 'info', message: 'Konten dikembalikan ke default.' });
            })
            .catch(() => {
                setStatus('Gagal menyimpan ke database');
                setToast({
                    type: 'info',
                    message:
                        'Gagal menyimpan ke database. Periksa koneksi server atau konfigurasi DB.',
                });
            })
            .finally(() => {
                window.clearTimeout(toastTimerRef.current);
                toastTimerRef.current = window.setTimeout(() => setToast(null), 2400);
            });
    };

    return (
        <div className="dashboard-shell">
            <div className="dashboard-layout">
                <aside className="dashboard-sidebar">
                    <div className="dashboard-brand">
                        <p className="dashboard-kicker">Velno Landing Page</p>
                        <h1 className="dashboard-title">Dashboard Konten</h1>
                        <p className="dashboard-note">
                            Semua perubahan tersimpan di browser. Gunakan gambar yang tidak terlalu besar.
                        </p>
                    </div>
                    <div className="dashboard-actions">
                        <Link className="dashboard-btn dashboard-btn--ghost" to="/">
                            Kembali ke Landing
                        </Link>
                        <button className="dashboard-btn dashboard-btn--primary" onClick={handleSaveNow}>
                            Simpan Sekarang
                        </button>
                        <button
                            className="dashboard-btn dashboard-btn--ghost"
                            onClick={() => {
                                clearDashboardAuthed();
                                navigate('/login');
                            }}
                        >
                            Logout
                        </button>
                        <button className="dashboard-btn dashboard-btn--danger" onClick={handleReset}>
                            Reset Default
                        </button>
                    </div>
                    <nav className="dashboard-nav">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                type="button"
                                className={`dashboard-nav-link ${
                                    activeSection === section.id ? 'is-active' : ''
                                }`}
                                onClick={() => setActiveSection(section.id)}
                            >
                                {section.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                <main className="dashboard-content">
                    {toast ? (
                        <div className={`dashboard-toast dashboard-toast--${toast.type}`}>
                            <span className="dashboard-toast-icon">
                                {toast.type === 'success' ? '✓' : 'ℹ'}
                            </span>
                            <span>{toast.message}</span>
                        </div>
                    ) : null}
                    <div className="dashboard-status">{status}</div>

                    {activeSection === 'brand' ? (
                <section id="dashboard-brand" className="dashboard-card">
                    <h2 className="dashboard-section-title">Branding</h2>
                    <div className="dashboard-grid">
                        <Field
                            label="Logo Text"
                            value={formData.brand.logoText}
                            onChange={(value) => updateByPath(['brand', 'logoText'], value)}
                        />
                        <Field
                            label="Logo Initials"
                            value={formData.brand.logoInitials}
                            onChange={(value) => updateByPath(['brand', 'logoInitials'], value)}
                        />
                        <Field
                            label="CTA Label (ID)"
                            value={formData.brand.ctaLabelId}
                            onChange={(value) => updateByPath(['brand', 'ctaLabelId'], value)}
                        />
                        <Field
                            label="CTA Label (EN)"
                            value={formData.brand.ctaLabelEn}
                            onChange={(value) => updateByPath(['brand', 'ctaLabelEn'], value)}
                        />
                    </div>
                    <ImageField
                        label="Logo Image (opsional)"
                        value={formData.brand.logoImage}
                        onChange={(value) => updateByPath(['brand', 'logoImage'], value)}
                    />
                </section>
                    ) : null}

                    {activeSection === 'hero' ? (
                    <section id="dashboard-hero" className="dashboard-card">
                    <h2 className="dashboard-section-title">Hero</h2>
                    <div className="dashboard-grid">
                        <Field
                            label="Kicker"
                            value={formData.hero.kicker}
                            onChange={(value) => updateByPath(['hero', 'kicker'], value)}
                        />
                        <Field
                            label="Judul"
                            value={formData.hero.title}
                            as="textarea"
                            onChange={(value) => updateByPath(['hero', 'title'], value)}
                        />
                        <Field
                            label="Subjudul"
                            value={formData.hero.subtitle}
                            as="textarea"
                            onChange={(value) => updateByPath(['hero', 'subtitle'], value)}
                        />
                    </div>
                    <div className="dashboard-grid">
                        <Field
                            label="Label Fokus"
                            value={formData.hero.focus.label}
                            onChange={(value) => updateByPath(['hero', 'focus', 'label'], value)}
                        />
                        <Field
                            label="Isi Fokus"
                            value={formData.hero.focus.value}
                            onChange={(value) => updateByPath(['hero', 'focus', 'value'], value)}
                        />
                        <Field
                            label="Label Launch"
                            value={formData.hero.launch.label}
                            onChange={(value) => updateByPath(['hero', 'launch', 'label'], value)}
                        />
                        <Field
                            label="Isi Launch"
                            value={formData.hero.launch.value}
                            onChange={(value) => updateByPath(['hero', 'launch', 'value'], value)}
                        />
                        <Field
                            label="Label Tombol"
                            value={formData.hero.ctaLabel}
                            onChange={(value) => updateByPath(['hero', 'ctaLabel'], value)}
                        />
                    </div>

                    <div className="dashboard-list">
                        <div className="dashboard-list-header">
                            <h3>Floating Cards</h3>
                            <button
                                className="dashboard-btn dashboard-btn--ghost"
                                type="button"
                                onClick={() =>
                                    addArrayItem(['hero', 'floats'], { title: 'Judul', text: 'Deskripsi' })
                                }
                            >
                                Tambah Float
                            </button>
                        </div>
                        {formData.hero.floats.map((item, index) => (
                            <div key={`hero-float-${index}`} className="dashboard-item">
                                <div className="dashboard-item-header">
                                    <span>Float {index + 1}</span>
                                    <button
                                        className="dashboard-btn dashboard-btn--danger"
                                        type="button"
                                        onClick={() => removeArrayItem(['hero', 'floats'], index)}
                                    >
                                        Hapus
                                    </button>
                                </div>
                                <div className="dashboard-grid">
                                    <Field
                                        label="Judul"
                                        value={item.title}
                                        onChange={(value) =>
                                            updateByPath(['hero', 'floats', index, 'title'], value)
                                        }
                                    />
                                    <Field
                                        label="Deskripsi"
                                        value={item.text}
                                        onChange={(value) =>
                                            updateByPath(['hero', 'floats', index, 'text'], value)
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="dashboard-list">
                        <div className="dashboard-list-header">
                            <h3>Kolase Gambar</h3>
                            <button
                                className="dashboard-btn dashboard-btn--ghost"
                                type="button"
                                onClick={() => addArrayItem(['hero', 'collageImages'], '')}
                            >
                                Tambah Gambar
                            </button>
                        </div>
                        {formData.hero.collageImages.map((image, index) => (
                            <div key={`hero-collage-${index}`} className="dashboard-item">
                                <div className="dashboard-item-header">
                                    <span>Gambar {index + 1}</span>
                                    <button
                                        className="dashboard-btn dashboard-btn--danger"
                                        type="button"
                                        onClick={() => removeArrayItem(['hero', 'collageImages'], index)}
                                    >
                                        Hapus
                                    </button>
                                </div>
                                <ImageField
                                    label="URL / Upload"
                                    value={image}
                                    onChange={(value) =>
                                        updateByPath(['hero', 'collageImages', index], value)
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </section>
                    ) : null}
                    {activeSection === 'about' ? (
                <section id="dashboard-about" className="dashboard-card">
                    <h2 className="dashboard-section-title">About</h2>
                    <div className="dashboard-grid">
                        <Field
                            label="Badge"
                            value={formData.about.badge}
                            onChange={(value) => updateByPath(['about', 'badge'], value)}
                        />
                        <Field
                            label="Kalimat"
                            value={formData.about.sentence}
                            as="textarea"
                            onChange={(value) => updateByPath(['about', 'sentence'], value)}
                        />
                        <Field
                            label="Label Tombol"
                            value={formData.about.buttonLabel}
                            onChange={(value) => updateByPath(['about', 'buttonLabel'], value)}
                        />
                    </div>
                </section>
                    ) : null}

                    {activeSection === 'why' ? (
                <section id="dashboard-why" className="dashboard-card">
                    <h2 className="dashboard-section-title">Kenapa Website</h2>
                    <div className="dashboard-grid">
                        <Field
                            label="Badge"
                            value={formData.whyWebsite.badge}
                            onChange={(value) => updateByPath(['whyWebsite', 'badge'], value)}
                        />
                        <Field
                            label="Judul"
                            value={formData.whyWebsite.title}
                            onChange={(value) => updateByPath(['whyWebsite', 'title'], value)}
                        />
                        <Field
                            label="Deskripsi"
                            value={formData.whyWebsite.description}
                            as="textarea"
                            onChange={(value) => updateByPath(['whyWebsite', 'description'], value)}
                        />
                    </div>
                    <div className="dashboard-list">
                        <div className="dashboard-list-header">
                            <h3>Card</h3>
                            <button
                                className="dashboard-btn dashboard-btn--ghost"
                                type="button"
                                onClick={() =>
                                    addArrayItem(['whyWebsite', 'cards'], {
                                        stat: '0%',
                                        title: 'Judul',
                                        detail: 'Deskripsi',
                                    })
                                }
                            >
                                Tambah Card
                            </button>
                        </div>
                        {formData.whyWebsite.cards.map((card, index) => (
                            <div key={`why-card-${index}`} className="dashboard-item">
                                <div className="dashboard-item-header">
                                    <span>Card {index + 1}</span>
                                    <button
                                        className="dashboard-btn dashboard-btn--danger"
                                        type="button"
                                        onClick={() => removeArrayItem(['whyWebsite', 'cards'], index)}
                                    >
                                        Hapus
                                    </button>
                                </div>
                                <div className="dashboard-grid">
                                    <Field
                                        label="Stat"
                                        value={card.stat}
                                        onChange={(value) =>
                                            updateByPath(['whyWebsite', 'cards', index, 'stat'], value)
                                        }
                                    />
                                    <Field
                                        label="Judul"
                                        value={card.title}
                                        onChange={(value) =>
                                            updateByPath(['whyWebsite', 'cards', index, 'title'], value)
                                        }
                                    />
                                    <Field
                                        label="Detail"
                                        value={card.detail}
                                        as="textarea"
                                        onChange={(value) =>
                                            updateByPath(['whyWebsite', 'cards', index, 'detail'], value)
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                    ) : null}

                    {activeSection === 'vs' ? (
                <section id="dashboard-vs" className="dashboard-card">
                    <h2 className="dashboard-section-title">VS Website</h2>
                    <div className="dashboard-grid">
                        <Field
                            label="Pill"
                            value={formData.vsWebsite.pill}
                            onChange={(value) => updateByPath(['vsWebsite', 'pill'], value)}
                        />
                        <Field
                            label="Judul (gunakan baris baru untuk line break)"
                            value={formData.vsWebsite.title}
                            as="textarea"
                            onChange={(value) => updateByPath(['vsWebsite', 'title'], value)}
                        />
                        <Field
                            label="Paragraf (satu paragraf per baris)"
                            value={formData.vsWebsite.paragraphs.join('\n')}
                            as="textarea"
                            onChange={(value) =>
                                updateByPath(['vsWebsite', 'paragraphs'], normalizeLines(value))
                            }
                        />
                        <Field
                            label="Label Agent"
                            value={formData.vsWebsite.label}
                            onChange={(value) => updateByPath(['vsWebsite', 'label'], value)}
                        />
                        <Field
                            label="Agent Desktop"
                            value={formData.vsWebsite.agentDesktop}
                            onChange={(value) => updateByPath(['vsWebsite', 'agentDesktop'], value)}
                        />
                        <Field
                            label="Nomor WA Agent Desktop"
                            value={formData.vsWebsite.agentDesktopNumber}
                            onChange={(value) =>
                                updateByPath(['vsWebsite', 'agentDesktopNumber'], value)
                            }
                            placeholder="628xxxxxxxxxx"
                        />
                        <Field
                            label="Agent Mobile"
                            value={formData.vsWebsite.agentMobile}
                            onChange={(value) => updateByPath(['vsWebsite', 'agentMobile'], value)}
                        />
                        <Field
                            label="Nomor WA Agent Mobile"
                            value={formData.vsWebsite.agentMobileNumber}
                            onChange={(value) =>
                                updateByPath(['vsWebsite', 'agentMobileNumber'], value)
                            }
                            placeholder="628xxxxxxxxxx"
                        />
                    </div>
                    <div className="dashboard-grid">
                        <ImageField
                            label="Gambar Browser"
                            value={formData.vsWebsite.mainImage}
                            onChange={(value) => updateByPath(['vsWebsite', 'mainImage'], value)}
                        />
                        <ImageField
                            label="Gambar Mini Card"
                            value={formData.vsWebsite.miniCardImage}
                            onChange={(value) => updateByPath(['vsWebsite', 'miniCardImage'], value)}
                        />
                    </div>
                </section>
                    ) : null}

                    {activeSection === 'whatsapp' ? (
                <section id="dashboard-whatsapp" className="dashboard-card">
                    <h2 className="dashboard-section-title">WhatsApp</h2>
                    <div className="dashboard-grid">
                        <Field
                            label="Teks Tombol Floating"
                            value={formData.whatsapp.floatLabel}
                            onChange={(value) => updateByPath(['whatsapp', 'floatLabel'], value)}
                        />
                        <Field
                            label="Nomor WA Floating"
                            value={formData.whatsapp.phone}
                            onChange={(value) => updateByPath(['whatsapp', 'phone'], value)}
                            placeholder="628xxxxxxxxxx"
                        />
                    </div>
                </section>
                    ) : null}

                    {activeSection === 'services' ? (
                <section id="dashboard-services" className="dashboard-card">
                    <h2 className="dashboard-section-title">Layanan</h2>
                    <div className="dashboard-grid">
                        <Field
                            label="Badge"
                            value={formData.services.badge}
                            onChange={(value) => updateByPath(['services', 'badge'], value)}
                        />
                        <Field
                            label="Judul"
                            value={formData.services.title}
                            as="textarea"
                            onChange={(value) => updateByPath(['services', 'title'], value)}
                        />
                        <Field
                            label="Deskripsi"
                            value={formData.services.description}
                            as="textarea"
                            onChange={(value) => updateByPath(['services', 'description'], value)}
                        />
                    </div>
                    <div className="dashboard-list">
                        <div className="dashboard-list-header">
                            <h3>Item Layanan</h3>
                            <button
                                className="dashboard-btn dashboard-btn--ghost"
                                type="button"
                                onClick={() =>
                                    addArrayItem(['services', 'items'], {
                                        title: 'Judul',
                                        detail: 'Deskripsi',
                                        type: 'integrations',
                                        image: '',
                                        icon: 'PlugZap',
                                    })
                                }
                            >
                                Tambah Item
                            </button>
                        </div>
                        {formData.services.items.map((item, index) => (
                            <div key={`service-item-${index}`} className="dashboard-item">
                                <div className="dashboard-item-header">
                                    <span>Item {index + 1}</span>
                                    <button
                                        className="dashboard-btn dashboard-btn--danger"
                                        type="button"
                                        onClick={() => removeArrayItem(['services', 'items'], index)}
                                    >
                                        Hapus
                                    </button>
                                </div>
                                <div className="dashboard-grid">
                                    <Field
                                        label="Judul"
                                        value={item.title}
                                        onChange={(value) =>
                                            updateByPath(['services', 'items', index, 'title'], value)
                                        }
                                    />
                                    <Field
                                        label="Deskripsi"
                                        value={item.detail}
                                        as="textarea"
                                        onChange={(value) =>
                                            updateByPath(['services', 'items', index, 'detail'], value)
                                        }
                                    />
                                    <SelectField
                                        label="Tipe Visual"
                                        value={item.type}
                                        onChange={(value) =>
                                            updateByPath(['services', 'items', index, 'type'], value)
                                        }
                                        options={[
                                            { value: 'integrations', label: 'Integrations' },
                                            { value: 'auth', label: 'Auth' },
                                            { value: 'voice', label: 'Voice' },
                                        ]}
                                    />
                                    <SelectField
                                        label="Icon"
                                        value={item.icon}
                                        onChange={(value) =>
                                            updateByPath(['services', 'items', index, 'icon'], value)
                                        }
                                        options={iconOptions}
                                    />
                                </div>
                                <ImageField
                                    label="Gambar"
                                    value={item.image}
                                    onChange={(value) =>
                                        updateByPath(['services', 'items', index, 'image'], value)
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </section>
                    ) : null}

                    {activeSection === 'solutions' ? (
                <section id="dashboard-solutions" className="dashboard-card">
                    <h2 className="dashboard-section-title">Kenapa Harus Kami</h2>
                    <div className="dashboard-grid">
                        <Field
                            label="Badge"
                            value={formData.solutions.badge}
                            onChange={(value) => updateByPath(['solutions', 'badge'], value)}
                        />
                        <Field
                            label="Judul"
                            value={formData.solutions.title}
                            onChange={(value) => updateByPath(['solutions', 'title'], value)}
                        />
                        <Field
                            label="Deskripsi"
                            value={formData.solutions.description}
                            as="textarea"
                            onChange={(value) => updateByPath(['solutions', 'description'], value)}
                        />
                    </div>
                    <ImageField
                        label="Gambar Utama"
                        value={formData.solutions.heroImage}
                        onChange={(value) => updateByPath(['solutions', 'heroImage'], value)}
                    />
                    <div className="dashboard-list">
                        <div className="dashboard-list-header">
                            <h3>Highlight</h3>
                            <button
                                className="dashboard-btn dashboard-btn--ghost"
                                type="button"
                                onClick={() =>
                                    addArrayItem(['solutions', 'highlights'], {
                                        title: 'Judul',
                                        detail: 'Deskripsi',
                                        icon: 'BarChart3',
                                    })
                                }
                            >
                                Tambah Highlight
                            </button>
                        </div>
                        {formData.solutions.highlights.map((item, index) => (
                            <div key={`solution-highlight-${index}`} className="dashboard-item">
                                <div className="dashboard-item-header">
                                    <span>Highlight {index + 1}</span>
                                    <button
                                        className="dashboard-btn dashboard-btn--danger"
                                        type="button"
                                        onClick={() => removeArrayItem(['solutions', 'highlights'], index)}
                                    >
                                        Hapus
                                    </button>
                                </div>
                                <div className="dashboard-grid">
                                    <Field
                                        label="Judul"
                                        value={item.title}
                                        onChange={(value) =>
                                            updateByPath(['solutions', 'highlights', index, 'title'], value)
                                        }
                                    />
                                    <Field
                                        label="Deskripsi"
                                        value={item.detail}
                                        as="textarea"
                                        onChange={(value) =>
                                            updateByPath(['solutions', 'highlights', index, 'detail'], value)
                                        }
                                    />
                                    <SelectField
                                        label="Icon"
                                        value={item.icon}
                                        onChange={(value) =>
                                            updateByPath(['solutions', 'highlights', index, 'icon'], value)
                                        }
                                        options={iconOptions}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                    ) : null}

                    {activeSection === 'work' ? (
                <section id="dashboard-work" className="dashboard-card">
                    <h2 className="dashboard-section-title">Cara Kami Bekerja</h2>
                    <div className="dashboard-grid">
                        <Field
                            label="Label"
                            value={formData.howWeWork.label}
                            onChange={(value) => updateByPath(['howWeWork', 'label'], value)}
                        />
                        <Field
                            label="Judul"
                            value={formData.howWeWork.title}
                            onChange={(value) => updateByPath(['howWeWork', 'title'], value)}
                        />
                    </div>
                    <div className="dashboard-list">
                        <div className="dashboard-list-header">
                            <h3>Steps</h3>
                            <button
                                className="dashboard-btn dashboard-btn--ghost"
                                type="button"
                                onClick={() =>
                                    addArrayItem(['howWeWork', 'steps'], {
                                        step: '0',
                                        title: 'Judul',
                                        description: 'Deskripsi',
                                    })
                                }
                            >
                                Tambah Step
                            </button>
                        </div>
                        {formData.howWeWork.steps.map((item, index) => (
                            <div key={`work-step-${index}`} className="dashboard-item">
                                <div className="dashboard-item-header">
                                    <span>Step {index + 1}</span>
                                    <button
                                        className="dashboard-btn dashboard-btn--danger"
                                        type="button"
                                        onClick={() => removeArrayItem(['howWeWork', 'steps'], index)}
                                    >
                                        Hapus
                                    </button>
                                </div>
                                <div className="dashboard-grid">
                                    <Field
                                        label="Nomor"
                                        value={item.step}
                                        onChange={(value) =>
                                            updateByPath(['howWeWork', 'steps', index, 'step'], value)
                                        }
                                    />
                                    <Field
                                        label="Judul"
                                        value={item.title}
                                        onChange={(value) =>
                                            updateByPath(['howWeWork', 'steps', index, 'title'], value)
                                        }
                                    />
                                    <Field
                                        label="Deskripsi"
                                        value={item.description}
                                        as="textarea"
                                        onChange={(value) =>
                                            updateByPath(
                                                ['howWeWork', 'steps', index, 'description'],
                                                value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                    ) : null}

                    {activeSection === 'portfolio' ? (
                <section id="dashboard-portfolio" className="dashboard-card">
                    <h2 className="dashboard-section-title">Portofolio</h2>
                    <div className="dashboard-grid">
                        <Field
                            label="Badge"
                            value={formData.portfolio.badge}
                            onChange={(value) => updateByPath(['portfolio', 'badge'], value)}
                        />
                        <Field
                            label="Judul"
                            value={formData.portfolio.title}
                            as="textarea"
                            onChange={(value) => updateByPath(['portfolio', 'title'], value)}
                        />
                        <Field
                            label="Deskripsi"
                            value={formData.portfolio.description}
                            as="textarea"
                            onChange={(value) => updateByPath(['portfolio', 'description'], value)}
                        />
                        <Field
                            label="Label Tombol"
                            value={formData.portfolio.buttonLabel}
                            onChange={(value) => updateByPath(['portfolio', 'buttonLabel'], value)}
                        />
                    </div>
                    <div className="dashboard-list">
                        <div className="dashboard-list-header">
                            <h3>Project</h3>
                            <button
                                className="dashboard-btn dashboard-btn--ghost"
                                type="button"
                                onClick={() =>
                                    addArrayItem(['portfolio', 'projects'], {
                                        name: 'Nama Project',
                                        bullets: ['Highlight'],
                                        tags: ['Tag'],
                                        link: '',
                                        images: [],
                                    })
                                }
                            >
                                Tambah Project
                            </button>
                        </div>
                        {formData.portfolio.projects.map((project, index) => (
                            <div key={`portfolio-project-${index}`} className="dashboard-item">
                                <div className="dashboard-item-header">
                                    <span>Project {index + 1}</span>
                                    <button
                                        className="dashboard-btn dashboard-btn--danger"
                                        type="button"
                                        onClick={() => removeArrayItem(['portfolio', 'projects'], index)}
                                    >
                                        Hapus
                                    </button>
                                </div>
                                <div className="dashboard-grid">
                                    <Field
                                        label="Nama"
                                        value={project.name}
                                        onChange={(value) =>
                                            updateByPath(['portfolio', 'projects', index, 'name'], value)
                                        }
                                    />
                                    <Field
                                        label="Link"
                                        value={project.link}
                                        onChange={(value) =>
                                            updateByPath(['portfolio', 'projects', index, 'link'], value)
                                        }
                                    />
                                    <Field
                                        label="Bullets (satu per baris)"
                                        value={project.bullets.join('\n')}
                                        as="textarea"
                                        onChange={(value) =>
                                            updateByPath(
                                                ['portfolio', 'projects', index, 'bullets'],
                                                normalizeLines(value)
                                            )
                                        }
                                    />
                                    <Field
                                        label="Tags (satu per baris)"
                                        value={project.tags.join('\n')}
                                        as="textarea"
                                        onChange={(value) =>
                                            updateByPath(
                                                ['portfolio', 'projects', index, 'tags'],
                                                normalizeLines(value)
                                            )
                                        }
                                    />
                                </div>
                                <div className="dashboard-list">
                                    <div className="dashboard-list-header">
                                        <h4>Gambar Project</h4>
                                        <button
                                            className="dashboard-btn dashboard-btn--ghost"
                                            type="button"
                                            onClick={() =>
                                                addArrayItem(
                                                    ['portfolio', 'projects', index, 'images'],
                                                    ''
                                                )
                                            }
                                        >
                                            Tambah Gambar
                                        </button>
                                    </div>
                                    {project.images.map((image, imageIndex) => (
                                        <div
                                            key={`portfolio-image-${imageIndex}`}
                                            className="dashboard-item"
                                        >
                                            <div className="dashboard-item-header">
                                                <span>Gambar {imageIndex + 1}</span>
                                                <button
                                                    className="dashboard-btn dashboard-btn--danger"
                                                    type="button"
                                                    onClick={() =>
                                                        removeArrayItem(
                                                            ['portfolio', 'projects', index, 'images'],
                                                            imageIndex
                                                        )
                                                    }
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                            <ImageField
                                                label="URL / Upload"
                                                value={image}
                                                onChange={(value) =>
                                                    updateByPath(
                                                        ['portfolio', 'projects', index, 'images', imageIndex],
                                                        value
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                    ) : null}

                    {activeSection === 'pricing' ? (
                <section id="dashboard-pricing" className="dashboard-card">
                    <h2 className="dashboard-section-title">Harga</h2>
                    <div className="dashboard-grid">
                        <Field
                            label="Badge"
                            value={formData.pricing.badge}
                            onChange={(value) => updateByPath(['pricing', 'badge'], value)}
                        />
                        <Field
                            label="Judul"
                            value={formData.pricing.title}
                            onChange={(value) => updateByPath(['pricing', 'title'], value)}
                        />
                        <Field
                            label="Deskripsi"
                            value={formData.pricing.description}
                            as="textarea"
                            onChange={(value) => updateByPath(['pricing', 'description'], value)}
                        />
                        <Field
                            label="Label CTA"
                            value={formData.pricing.ctaLabel}
                            onChange={(value) => updateByPath(['pricing', 'ctaLabel'], value)}
                        />
                    </div>
                    <div className="dashboard-list">
                        <div className="dashboard-list-header">
                            <h3>Paket</h3>
                            <button
                                className="dashboard-btn dashboard-btn--ghost"
                                type="button"
                                onClick={() =>
                                    addArrayItem(['pricing', 'plans'], {
                                        name: 'Nama Paket',
                                        price: 'Rp 0',
                                        highlight: false,
                                        features: [],
                                        unavailable: [],
                                    })
                                }
                            >
                                Tambah Paket
                            </button>
                        </div>
                        {formData.pricing.plans.map((plan, index) => (
                            <div key={`pricing-plan-${index}`} className="dashboard-item">
                                <div className="dashboard-item-header">
                                    <span>Paket {index + 1}</span>
                                    <button
                                        className="dashboard-btn dashboard-btn--danger"
                                        type="button"
                                        onClick={() => removeArrayItem(['pricing', 'plans'], index)}
                                    >
                                        Hapus
                                    </button>
                                </div>
                                <div className="dashboard-grid">
                                    <Field
                                        label="Nama"
                                        value={plan.name}
                                        onChange={(value) =>
                                            updateByPath(['pricing', 'plans', index, 'name'], value)
                                        }
                                    />
                                    <Field
                                        label="Harga"
                                        value={plan.price}
                                        onChange={(value) =>
                                            updateByPath(['pricing', 'plans', index, 'price'], value)
                                        }
                                    />
                                    <div className="dashboard-field dashboard-checkbox">
                                        <label>Highlight</label>
                                        <input
                                            type="checkbox"
                                            checked={plan.highlight}
                                            onChange={(event) =>
                                                updateByPath(
                                                    ['pricing', 'plans', index, 'highlight'],
                                                    event.target.checked
                                                )
                                            }
                                        />
                                    </div>
                                    <Field
                                        label="Fitur (satu per baris)"
                                        value={plan.features.join('\n')}
                                        as="textarea"
                                        onChange={(value) =>
                                            updateByPath(
                                                ['pricing', 'plans', index, 'features'],
                                                normalizeLines(value)
                                            )
                                        }
                                    />
                                    <Field
                                        label="Tidak Tersedia (satu per baris)"
                                        value={plan.unavailable.join('\n')}
                                        as="textarea"
                                        onChange={(value) =>
                                            updateByPath(
                                                ['pricing', 'plans', index, 'unavailable'],
                                                normalizeLines(value)
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                    ) : null}

                    {activeSection === 'contact' ? (
                <section id="dashboard-contact" className="dashboard-card">
                    <h2 className="dashboard-section-title">Contact CTA</h2>
                    <div className="dashboard-grid">
                        <Field
                            label="Badge"
                            value={formData.contact.badge}
                            onChange={(value) => updateByPath(['contact', 'badge'], value)}
                        />
                        <Field
                            label="Judul"
                            value={formData.contact.title}
                            onChange={(value) => updateByPath(['contact', 'title'], value)}
                        />
                        <Field
                            label="Deskripsi"
                            value={formData.contact.description}
                            as="textarea"
                            onChange={(value) => updateByPath(['contact', 'description'], value)}
                        />
                        <Field
                            label="Label Tombol"
                            value={formData.contact.buttonLabel}
                            onChange={(value) => updateByPath(['contact', 'buttonLabel'], value)}
                        />
                    </div>
                    <ImageField
                        label="Background"
                        value={formData.contact.backgroundImage}
                        onChange={(value) => updateByPath(['contact', 'backgroundImage'], value)}
                    />
                </section>
                    ) : null}

                    {activeSection === 'footer' ? (
                <section id="dashboard-footer" className="dashboard-card">
                    <h2 className="dashboard-section-title">Footer</h2>
                    <div className="dashboard-grid">
                        <Field
                            label="Deskripsi"
                            value={formData.footer.description}
                            as="textarea"
                            onChange={(value) => updateByPath(['footer', 'description'], value)}
                        />
                        <Field
                            label="Email"
                            value={formData.footer.email}
                            onChange={(value) => updateByPath(['footer', 'email'], value)}
                        />
                        <Field
                            label="Label Studio"
                            value={formData.footer.studioLabel}
                            onChange={(value) => updateByPath(['footer', 'studioLabel'], value)}
                        />
                        <Field
                            label="Lokasi Studio"
                            value={formData.footer.studioLocation}
                            onChange={(value) => updateByPath(['footer', 'studioLocation'], value)}
                        />
                        <Field
                            label="Telepon Studio"
                            value={formData.footer.studioPhone}
                            onChange={(value) => updateByPath(['footer', 'studioPhone'], value)}
                        />
                        <Field
                            label="Jam Operasional"
                            value={formData.footer.studioHours}
                            onChange={(value) => updateByPath(['footer', 'studioHours'], value)}
                        />
                        <Field
                            label="Label Links"
                            value={formData.footer.linksLabel}
                            onChange={(value) => updateByPath(['footer', 'linksLabel'], value)}
                        />
                        <Field
                            label="Copyright"
                            value={formData.footer.copyright}
                            onChange={(value) => updateByPath(['footer', 'copyright'], value)}
                        />
                    </div>
                </section>
                    ) : null}

                    <div className="dashboard-footer-note">
                        <p>
                            Status: {status}. Jika ingin pindahkan data ke server nanti, hubungkan penyimpanan
                            ke backend.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
