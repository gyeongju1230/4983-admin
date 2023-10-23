import * as styles from "@/components/common/main-content/keyword-input/KeywordInput.style";

export const KeywordInput = ({ placeholder, value, onChange, onKeyPress }) => {
  return (
    <styles.KeywordInputStyle
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
};
