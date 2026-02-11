/**
 * Country Form Component
 * Form for creating/editing countries
 */

'use client';

import { useState, useEffect } from 'react';
import { FormField } from '@/components/common';
import { CONFEDERATIONS } from '@/lib/constants';

export default function CountryForm({ 
  country = null, 
  onSubmit, 
  onCancel,
  loading = false 
}) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    confederation: '',
    flag_url: '',
    fifa_points: 0,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (country) {
      setFormData({
        name: country.name || '',
        code: country.code || '',
        confederation: country.confederation || '',
        flag_url: country.flag_url || '',
        fifa_points: country.fifa_points || 0,
      });
    }
  }, [country]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Country name is required';
    }

    if (!formData.code.trim()) {
      newErrors.code = 'Country code is required';
    } else if (formData.code.length !== 3) {
      newErrors.code = 'Country code must be exactly 3 characters';
    }

    if (!formData.confederation) {
      newErrors.confederation = 'Confederation is required';
    }

    if (formData.fifa_points < 0) {
      newErrors.fifa_points = 'FIFA points cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Country Name */}
      <FormField
        label="Country Name"
        required
        error={errors.name}
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Indonesia"
          className="input-dark w-full"
          disabled={loading}
        />
      </FormField>

      {/* Country Code */}
      <FormField
        label="Country Code (ISO 3166-1 alpha-3)"
        required
        error={errors.code}
      >
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="e.g., IDN"
          maxLength={3}
          className="input-dark w-full uppercase"
          disabled={loading}
        />
        <p className="text-xs text-dark-muted mt-1">
          3-letter country code (e.g., USA, BRA, GER)
        </p>
      </FormField>

      {/* Confederation */}
      <FormField
        label="Confederation"
        required
        error={errors.confederation}
      >
        <select
          name="confederation"
          value={formData.confederation}
          onChange={handleChange}
          className="select-dark w-full"
          disabled={loading}
        >
          <option value="">Select confederation</option>
          {CONFEDERATIONS.map(conf => (
            <option key={conf.value} value={conf.value}>
              {conf.label} - {conf.name}
            </option>
          ))}
        </select>
      </FormField>

      {/* Flag URL */}
      <FormField
        label="Flag URL (Optional)"
        error={errors.flag_url}
      >
        <input
          type="url"
          name="flag_url"
          value={formData.flag_url}
          onChange={handleChange}
          placeholder="https://flagcdn.com/w320/id.png"
          className="input-dark w-full"
          disabled={loading}
        />
        <p className="text-xs text-dark-muted mt-1">
          URL to country flag image
        </p>
      </FormField>

      {/* FIFA Points */}
      {country && (
        <FormField
          label="FIFA Points"
          error={errors.fifa_points}
        >
          <input
            type="number"
            name="fifa_points"
            value={formData.fifa_points}
            onChange={handleChange}
            step="0.01"
            min="0"
            className="input-dark w-full"
            disabled={loading}
          />
          <p className="text-xs text-warning mt-1">
            ⚠️ Manual changes will affect rankings
          </p>
        </FormField>
      )}

      {/* Preview */}
      {formData.flag_url && (
        <div>
          <label className="block text-sm font-medium mb-2">Preview</label>
          <div className="flex items-center space-x-3 p-4 bg-dark-hover rounded-lg">
            <img 
              src={formData.flag_url} 
              alt="Flag preview"
              className="w-16 h-12 object-cover rounded shadow-md"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div>
              <div className="font-semibold">{formData.name || 'Country Name'}</div>
              <div className="text-sm text-dark-muted">{formData.code || 'CODE'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-dark-border">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Saving...' : country ? 'Update Country' : 'Create Country'}
        </button>
      </div>
    </form>
  );
}