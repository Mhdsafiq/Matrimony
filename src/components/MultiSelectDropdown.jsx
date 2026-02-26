import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import './MultiSelectDropdown.css';

const MultiSelectDropdown = ({ options, selected, onChange, placeholder = 'Search...' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus search when opened
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    const handleToggle = (option) => {
        let newSelected;
        if (selected.includes(option)) {
            // Deselect
            newSelected = selected.filter(s => s !== option);
        } else {
            // Select
            newSelected = [...selected, option];
        }
        onChange(newSelected);
    };

    const filteredOptions = options.filter(o =>
        o.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Display text
    const getDisplayText = () => {
        if (selected.length === 0) return "Doesn't Matter";
        if (selected.length === 1) return selected[0];
        if (selected.length === options.length) return "Doesn't Matter";
        return `${selected.length} selected`;
    };

    return (
        <div className="msd-wrapper" ref={dropdownRef}>
            <div
                className={`msd-trigger ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="msd-display-text">{getDisplayText()}</span>
                {isOpen ? <ChevronUp size={16} color="#888" /> : <ChevronDown size={16} color="#888" />}
            </div>

            {isOpen && (
                <div className="msd-dropdown">
                    <div className="msd-search-wrap">
                        <input
                            ref={searchInputRef}
                            type="text"
                            className="msd-search-input"
                            placeholder={placeholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search size={14} className="msd-search-icon" />
                    </div>
                    <ul className="msd-options">
                        {filteredOptions.map(option => {
                            const isChecked = selected.includes(option);
                            return (
                                <li
                                    key={option}
                                    className={`msd-option ${isChecked ? 'checked' : ''}`}
                                    onClick={() => handleToggle(option)}
                                >
                                    <span className={`msd-checkbox ${isChecked ? 'checked' : ''}`}>
                                        {isChecked && (
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M2 6L5 9L10 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </span>
                                    <span className="msd-option-label">{option}</span>
                                </li>
                            );
                        })}
                        {filteredOptions.length === 0 && (
                            <li className="msd-no-results">No options found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
