import '../filter.css'
import TagOption from './tagOption.tsx'

function Filter({ 
  filter, 
  openFilter, 
  setOpenFilter,
  setTags, 
  setRarity,
  currentTag,
  currentRarity
}: { 
  filter?: string;
  openFilter: string | null;
  setOpenFilter: (val: string | null) => void;
  setTags: (val: string | null) => void;
  setRarity: (val: string | null) => void;
  currentTag?: string | null;
  currentRarity?: string | null;
}) {
  const open = openFilter === filter;
  const selected = filter === 'tags' ? (currentTag ?? 'None') : (currentRarity ?? 'None');
  const tags = ["Slammer", "Item", "Energy", "Trainer", "Rune", "YCST"];
  const rars = ["Trash", "Common", "Uncommon", "Rare", "Legendary", "Mythic"];

  return (
    <div className="filter-container">
      <div className="filter">
        <h3 className="filter-title">Filter by {filter}</h3>
        <div className="add-cont">
          <div className = {`tag-label ${selected.toLowerCase()}`}>
            {selected != 'None' && <div className="tagView">{selected}</div>}
            <img
              className={`arrow ${open || (selected != "None") ? 'rotate' : ''}`}
              src="/icons/addIcon.png"
              alt="add"
              width="25"
              height="25"
              onClick={() => {
                  if (selected === 'None') {
                  if (open) {
                    setOpenFilter(null); // close if already open
                  } else {
                    setOpenFilter(filter || null); // open this, closes others
                  }
                } else {
                  // clear selection by setting parent state to null
                  switch (filter) {
                    case 'tags':
                      setTags(null);
                      break
                    case 'rarity':
                      setRarity(null);
                      break
                    default:
                      break
                  }
                }
            }}
            />
          </div>
        </div>
      </div>
      {open && filter === 'tags' &&
        <div className="options">
          {tags.map((option) => (
          option != selected && <TagOption
            key={option}
            option={option}
            selected={selected === option}
            onClick={() => {
              setTags(option);
              setOpenFilter(null); // close if already open
            }}
          />
        ))}
        </div>
      }
      {open && filter === 'rarity' &&
        <div className="options">
          {rars.map((option) => (
          <TagOption
            key={option}
            option={option}
            selected={selected === option}
            onClick={() => {
              setRarity(option);
              setOpenFilter(null); // close if already open
            }}
          />
        ))}
        </div>
      }
    </div>
  );
}

export default Filter