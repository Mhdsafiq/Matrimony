import React, { useState, useEffect } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import './PartnerReligionEditor.css';

const familyStatusOptions = ["Rich/Affluent", "Upper Middle Class", "Middle Class", "Lower Middle Class", "Humble"];
const familyTypeOptions = ["Joint Family", "Nuclear Family", "Others"];
const livingWithParentsOptions = ["Yes", "No", "Not Applicable"];

const PartnerFamilyEditor = ({ initialData, onSave, onCancel }) => {
    const [form, setForm] = useState({
        prefFamilyStatus: '',
        prefFamilyType: '',
        prefLivingWithParents: ''
    });

    const [activeModal, setActiveModal] = useState(null);

    useEffect(() => {
        if (initialData) {
            setForm({
                prefFamilyStatus: initialData.prefFamilyStatus || '',
                prefFamilyType: initialData.prefFamilyType || '',
                prefLivingWithParents: initialData.prefLivingWithParents || ''
            });
        }
    }, [initialData]);

    const handleSave = () => {
        onSave(form);
    };

    const toArray = (fieldKey) => form[fieldKey] ? form[fieldKey].split(',').map(s => s.trim()).filter(Boolean) : [];

    const isSelected = (fieldKey, val) => toArray(fieldKey).includes(val);

    const toggleItem = (fieldKey, val) => {
        let arr = toArray(fieldKey);
        if (arr.includes(val)) {
            arr = arr.filter(item => item !== val);
        } else {
            arr.push(val);
        }
        setForm({ ...form, [fieldKey]: arr.join(', ') });
    };

    const clearField = (fieldKey) => {
        setForm({ ...form, [fieldKey]: '' });
    };

    const renderModal = (type, fieldKey) => {
        let title = '';
        let options = [];

        if (type === 'familyStatus') {
            title = "Family Status";
            options = familyStatusOptions;
        } else if (type === 'familyType') {
            title = "Family Type";
            options = familyTypeOptions;
        } else if (type === 'livingWithParents') {
            title = "Living with Parents";
            options = livingWithParentsOptions;
        }

        const arr = toArray(fieldKey);
        const isDoesntMatter = arr.length === 0;

        return (
            <div className="proe-modal-overlay" onClick={() => setActiveModal(null)}>
                <div className="proe-modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="proe-modal-header">
                        <h2 style={{ fontSize: '1.25rem', color: '#1a2a3a', fontWeight: '700', margin: 0 }}>{title}</h2>
                        <button className="proe-close" onClick={() => setActiveModal(null)}><X size={20} /></button>
                    </div>

                    {/* Selected chips summary */}
                    {!isDoesntMatter && (
                        <div style={{ padding: '0 16px 8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {arr.map(sel => (
                                <div key={sel} className="proe-selected-chip">
                                    {sel} <button onClick={() => toggleItem(fieldKey, sel)}><X size={12} /></button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="proe-modal-body">
                        {/* Doesn't Matter option */}
                        <div className="proe-option-item" onClick={() => clearField(fieldKey)}>
                            <div className={`proe-checkbox ${isDoesntMatter ? 'checked' : ''}`}>
                                {isDoesntMatter && <div className="proe-check-mark" />}
                            </div>
                            <span style={{ fontWeight: isDoesntMatter ? 600 : 400 }}>Doesn't Matter</span>
                        </div>

                        {options.map(opt => {
                            const selected = isSelected(fieldKey, opt);
                            return (
                                <div key={opt} className="proe-option-item" onClick={() => toggleItem(fieldKey, opt)}>
                                    <div className={`proe-checkbox ${selected ? 'checked' : ''}`}>
                                        {selected && <div className="proe-check-mark" />}
                                    </div>
                                    <span style={{ fontWeight: selected ? 600 : 400 }}>{opt}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="proe-modal-footer">
                        <button className="proe-done-btn" onClick={() => setActiveModal(null)}>Done</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="proe-fullscreen-overlay">
            <div className="proe-container">
                <div className="proe-header">
                    <button className="proe-back-btn" onClick={onCancel}><ArrowLeft size={24} color="#374151" /></button>
                    <div>
                        <h2 className="proe-title">Partner's Family Details</h2>
                        <p className="proe-subtitle">Update these details to get suitable matches</p>
                    </div>
                </div>

                <div className="proe-content">
                    {/* Family Status */}
                    <div className="proe-field-group" onClick={() => setActiveModal('familyStatus')} style={{ cursor: 'pointer' }}>
                        <label className="proe-label">Family Status</label>
                        <div className="proe-value-display">
                            {form.prefFamilyStatus || "Doesn't Matter"}
                        </div>
                    </div>

                    {/* Family Type */}
                    <div className="proe-field-group" onClick={() => setActiveModal('familyType')} style={{ cursor: 'pointer' }}>
                        <label className="proe-label">Family Type</label>
                        <div className="proe-value-display">
                            {form.prefFamilyType || "Doesn't Matter"}
                        </div>
                    </div>

                    {/* Living with Parents */}
                    <div className="proe-field-group" onClick={() => setActiveModal('livingWithParents')} style={{ cursor: 'pointer' }}>
                        <label className="proe-label">Living with Parents</label>
                        <div className="proe-value-display">
                            {form.prefLivingWithParents || "Doesn't Matter"}
                        </div>
                    </div>
                </div>

                <div className="proe-footer">
                    <button className="proe-save-btn" onClick={handleSave}>Save</button>
                </div>
            </div>

            {/* Sub Modals */}
            {activeModal === 'familyStatus' && renderModal('familyStatus', 'prefFamilyStatus')}
            {activeModal === 'familyType' && renderModal('familyType', 'prefFamilyType')}
            {activeModal === 'livingWithParents' && renderModal('livingWithParents', 'prefLivingWithParents')}
        </div>
    );
};

export default PartnerFamilyEditor;
