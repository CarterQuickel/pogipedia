import '../tagOption.css'

type TagOptionProps = {
  option: string;
  selected?: boolean;
  onClick: (value: string) => void;
};

function TagOption({ option, selected, onClick }: TagOptionProps) {
    return (
        <div className={`tag-option ${option.toLowerCase()} ${selected ? 'selected' : ''}`}
         onClick={() => onClick(option)}>
            <h3 className="option-text">{option}</h3>
            <h3 className="addTxt">+</h3>
        </div>
    )
}

export default TagOption