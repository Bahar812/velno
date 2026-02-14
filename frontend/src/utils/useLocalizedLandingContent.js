import { useMemo } from 'react';
import { englishLandingContent } from '../data/landingContentEn';
import { useUi } from '../context/UiContext';
import { useLandingContent } from './useLandingContent';

const isPlainObject = (value) =>
    Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const mergeDeep = (base, override) => {
    if (!isPlainObject(base)) {
        return override ?? base;
    }
    const result = { ...base };
    if (!isPlainObject(override)) {
        return result;
    }
    Object.keys(override).forEach((key) => {
        const baseValue = base[key];
        const overrideValue = override[key];
        if (Array.isArray(baseValue)) {
            if (!Array.isArray(overrideValue)) {
                result[key] = baseValue;
                return;
            }

            const merged = baseValue.map((item, index) => {
                const localizedItem = overrideValue[index];
                if (localizedItem === undefined) {
                    return item;
                }
                if (isPlainObject(item) && isPlainObject(localizedItem)) {
                    return mergeDeep(item, localizedItem);
                }
                return localizedItem ?? item;
            });

            if (overrideValue.length > baseValue.length) {
                result[key] = merged.concat(overrideValue.slice(baseValue.length));
            } else {
                result[key] = merged;
            }
        } else if (isPlainObject(baseValue)) {
            result[key] = mergeDeep(baseValue, overrideValue);
        } else {
            result[key] = overrideValue ?? baseValue;
        }
    });
    return result;
};

export const useLocalizedLandingContent = () => {
    const content = useLandingContent();
    const { language } = useUi();

    return useMemo(() => {
        if (language !== 'en') {
            return content;
        }
        return mergeDeep(content, englishLandingContent);
    }, [content, language]);
};
