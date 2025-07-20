// src/components/FilterSidebar.jsx
import React from 'react';
import styles from './FilterSidebar.module.css';

// Data for our time slots to avoid repetition
const timeSlots = [
  { label: 'Before 6 AM', start: 0, end: 6, icon: 'morning' },
  { label: '6 am - 12 pm', start: 6, end: 12, icon: 'noon' },
  { label: '12 pm - 6 pm', start: 12, end: 18, icon: 'evening' },
  { label: 'After 6 pm', start: 18, end: 24, icon: 'night' },
];

const TimeSlotGroup = ({ title, filterName, activeSlot, onFilterChange }) => (
  <div className={styles.timeSlot}>
    <div className="font-weight-bold">{title}</div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {timeSlots.map(slot => {
        const isActive = activeSlot && activeSlot.start === slot.start;
        return (
          <div 
            key={slot.label}
            className={`${styles.squareBox} ${isActive ? styles.active : ''}`}
            onClick={() => onFilterChange(filterName, { start: slot.start, end: slot.end })}
          >
            <div className={styles.filterImgDiv}>
              <img src={`/img/${slot.icon}_${isActive ? 'active' : 'inactive'}.png`} alt={slot.label} />
            </div>
            <div>{slot.label}</div>
          </div>
        );
      })}
    </div>
  </div>
);

const FilterSidebar = ({ onFilterChange, onResetFilter, maxPrice, filters }) => {
  return (
    <div className={`col-lg-3 ${styles.filterDiv}`}>
      <div className={styles.filter}>
        <center><h4>Filter Results</h4></center>
        <div className={styles.filterBox}>
          <div className={styles.filterPrice}>
            <div className="font-weight-bold">Price</div>
            <input 
              type="range" 
              className="form-control-range" 
              min="0"
              max={maxPrice} 
              value={filters.price}
              onChange={(e) => onFilterChange('price', e.target.value)}
            />
            <div className={styles.priceRangeOutput}>
              <span>₹ 0</span>
              <span>₹ {filters.price}</span>
            </div>
          </div>
          
          <TimeSlotGroup
            title="Departure Time"
            filterName="departSlot"
            activeSlot={filters.departSlot}
            onFilterChange={onFilterChange}
          />
          
          <TimeSlotGroup
            title="Arrival Time"
            filterName="arriveSlot"
            activeSlot={filters.arriveSlot}
            onFilterChange={onFilterChange}
          />

        </div>
        <div className={styles.clrFilterDiv}>
          <center>
            <button className={styles.btnLink} onClick={onResetFilter}>Reset Filters</button>
          </center>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;