import JSONView, {
  ThemeKeys,
  ReactJsonViewProps,
  OnSelectProps,
  ThemeObject
} from "react-json-view";

export type JsonViewTheme = ThemeKeys;

export type JsonViewIconStyle = ReactJsonViewProps["iconStyle"];

export interface CustomThemeStyle {
  backgroundColor?: string;
  alignmentLineColor?: string;
  itemsCountColor?: string;
  numberValueColor?: string;
  stringValueColor?: string;
  booleanValueColor?: string;
  keyAndBracketColor?: string;
  arrayItemCountColor?: string;
  collapseColor?: string;
}

export interface OnPathClickProps {
  keyPath: string;
  keyName: string | null;
  valueType: string;
  value: any;
}

interface JsonViewProps {
  src: any;
  onSelect?: (path: OnPathClickProps) => void;
  theme?: JsonViewTheme;
  displayDataTypes?: boolean;
  enableClipboard?: boolean;
  sortKeys?: boolean;
  collapsed?: boolean | number;
  style?: React.CSSProperties;
  iconStyle?: JsonViewIconStyle;
  customThemeStyle?: CustomThemeStyle;
}

const customThemeColors: ThemeObject = {
  base00: "#1e1e1e",
  base01: "#282c34",
  base02: "#3a3f4b",
  base03: "#6c7986",
  base04: "#abb2bf",
  base05: "#d19a66",
  base06: "#98c379",
  base07: "#e5c07b",
  base08: "#d19a66",
  base09: "#56b6c2",
  base0A: "#61dafb",
  base0B: "#c678dd",
  base0C: "#d19a66",
  base0D: "#e06c75",
  base0E: "#56b6c2",
  base0F: "#be5046",
};

const JsonView = ({
  src = null,
  onSelect = () => {},
  theme,
  displayDataTypes,
  enableClipboard,
  collapsed,
  sortKeys,
  style,
  iconStyle,
  customThemeStyle,
}: JsonViewProps) => {
  const handleKeyClick = (event: OnSelectProps) => {
    const path = event.namespace.join(".") + "." + event.name;
    onSelect({
      keyPath: path,
      keyName: event.name,
      valueType: typeof event.value,
      value: event.value,
    });
  };

  let shouldUseCustomTheme = Object.keys(customThemeStyle ?? {}).length > 0;

  if (shouldUseCustomTheme) {
    const themeMapping: Record<
      keyof CustomThemeStyle,
      keyof typeof customThemeColors
    > = {
      backgroundColor: "base00",
      alignmentLineColor: "base02",
      itemsCountColor: "base04",
      keyAndBracketColor: "base07",
      stringValueColor: "base09",
      arrayItemCountColor: "base0C",
      collapseColor: "base0D",
      booleanValueColor: "base0E",
      numberValueColor: "base0F",
    };

    Object.entries(customThemeStyle ?? {}).forEach(([key, value]) => {
      if (value) {
        const baseKey = themeMapping[key as keyof CustomThemeStyle];
        if (baseKey) {
          customThemeColors[baseKey] = value;
        }
      }
    });
  }

  return (
    <JSONView
      src={src}
      theme={shouldUseCustomTheme ? customThemeColors : theme}
      displayDataTypes={displayDataTypes}
      enableClipboard={enableClipboard}
      collapsed={collapsed}
      sortKeys={sortKeys}
      style={style}
      onSelect={handleKeyClick}
      iconStyle={iconStyle}
    />
  );
};

export default JsonView;
