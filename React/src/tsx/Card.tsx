import '../card.css';
import { useState } from 'react';
import type { Pog } from '../types';

function Card({ pog, onClick, search = "" }: { pog: Pog; onClick?: () => void; search?: string }) {
    const imageUrlWebp = `/pogs/${pog.code2}.webp`; // WebP image URL
    const imageUrlPng = `/pogs/${pog.code2}.png`; // PNG image URL
    const colors = {
        Trash: '#757028',
        Common: '#deee4d',
        Uncommon: '#6bce3e',
        Rare: '#34acdb',
        Legendary: '#bc74ff',
        Mythic: '#FF4500',
        Unknown: '#000000'
    };
    let name = pog.name;
    const borderColor = colors[pog.rank as keyof typeof colors] || colors.Unknown;
    // For attribute tags
    const showAttribute = pog.attribute?.trim().toLowerCase() !== 'none' && pog.attribute?.trim() !== '';
    const attributeColor = {
        Slammer: '#ff6347',
        Item: '#1e90ff',
        Energy: '#8f32cd',
        Trainer: '#1aa02c',
        Rune: '#f09723',
        YCST: '#174e25',
        Unknown: '#000000'
    };
    // Flip pog variable
    const [flipped, setFlipped] = useState(false);
    const q = (search || "").trim();
    const lowerName = (name || "").toLowerCase();
    let nameElement: any = name;
    if (q.length > 0) {
        const idx = lowerName.indexOf(q.toLowerCase());
        if (idx >= 0) {
            const before = name.slice(0, idx);
            const match = name.slice(idx, idx + q.length);
            const after = name.slice(idx + q.length);
            nameElement = (<>{before}<mark>{match}</mark>{after}</>);
        }
    }
    return (
        <div className="card">
            <div className="clicker" onClick={onClick}></div>
            {showAttribute && <div className="tag" 
                style={{display: showAttribute ? 'flex' : 'none', 
                    backgroundColor: attributeColor[pog.attribute as keyof typeof attributeColor] || attributeColor.Unknown
                }}>
                    {pog.attribute}</div>}
            <img className = "hint"  onClick={() => setFlipped(!flipped)} src="/icons/rotate.png" alt="Rotate" width="25" height="25"/>
            {flipped ? (
                <div className = "back">
                    <img 
                        src={imageUrlWebp? imageUrlWebp: imageUrlPng}
                        alt={name}
                        className="card-back bvis" 
                        width="140" height="140" 
                        style = {{pointerEvents: 'none'}}/>
                    <h3 className="card-s">{pog.serial}</h3>
                </div>
                ) : (
                <img 
                    src={imageUrlWebp? imageUrlWebp: imageUrlPng}
                    alt={name}
                    className="card-image vis" 
                    width="140" height="140" 
                    style = {{pointerEvents: 'none'}}/>
            )}
            {search !== "" && <div className="searchTag">{nameElement}</div>}
            <div className = "glint" style={{boxShadow: `0 0 100px ${borderColor}`}}></div>
            <div className = "vL"></div>
            <div className = "hL"></div>
            <div className = "vL s"></div>
            <div className = "hL s"></div>
        </div>
    )
}

export default Card