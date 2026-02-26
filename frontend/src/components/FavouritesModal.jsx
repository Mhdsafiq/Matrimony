import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import './FavouritesModal.css';

const FavouritesModal = ({ title, options, selected, onDone, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [localSelected, setLocalSelected] = useState([...selected]);
    const searchInputRef = useRef(null);

    useEffect(() => {
        // Focus search input on open
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleToggle = (option) => {
        setLocalSelected(prev =>
            prev.includes(option)
                ? prev.filter(s => s !== option)
                : [...prev, option]
        );
    };

    const handleRemoveChip = (option) => {
        setLocalSelected(prev => prev.filter(s => s !== option));
    };

    const handleDone = () => {
        onDone(localSelected);
    };

    const filteredOptions = options.filter(o =>
        o.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fav-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="fav-modal-container">
                {/* Header */}
                <div className="fav-modal-header">
                    <h2 className="fav-modal-title">{title}</h2>
                    <button className="fav-modal-close-btn" onClick={onClose}>
                        <X size={22} />
                    </button>
                </div>

                {/* Selected Chips */}
                {localSelected.length > 0 && (
                    <div className="fav-modal-chips">
                        {localSelected.map(item => (
                            <span key={item} className="fav-modal-chip">
                                {item}
                                <button className="fav-chip-remove" onClick={() => handleRemoveChip(item)}>
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                    </div>
                )}

                {/* Search */}
                <div className="fav-modal-search">
                    <input
                        ref={searchInputRef}
                        type="text"
                        className="fav-search-input"
                        placeholder="Type to search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search size={18} className="fav-search-icon" />
                </div>

                {/* Options List */}
                <div className="fav-modal-options">
                    {filteredOptions.map(option => {
                        const isChecked = localSelected.includes(option);
                        return (
                            <div
                                key={option}
                                className={`fav-modal-option ${isChecked ? 'checked' : ''}`}
                                onClick={() => handleToggle(option)}
                            >
                                <span className={`fav-checkbox ${isChecked ? 'checked' : ''}`}>
                                    {isChecked && (
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M2.5 7L5.5 10L11.5 3.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </span>
                                <span className="fav-option-label">{option}</span>
                            </div>
                        );
                    })}
                    {filteredOptions.length === 0 && (
                        <div className="fav-no-results">No options found</div>
                    )}
                </div>

                {/* Done Button */}
                <div className="fav-modal-footer">
                    <button className="fav-done-btn" onClick={handleDone}>
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FavouritesModal;
