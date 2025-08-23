import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,

} from 'react-native';
import { Colors } from '../../constants/styles';
import { Icon } from '../Icon';
interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  currentFilters: {
    ageMin: number;
    ageMax: number;
    professions: string[];
    locations: string[];
    religions: string[];
    genders: string[];
    salaryMin: number;
    salaryMax: number;
  };
  onApplyFilters: (filters: {
    ageMin: number;
    ageMax: number;
    professions: string[];
    locations: string[];
    religions: string[];
    genders: string[];
    salaryMin: number;
    salaryMax: number;
  }) => void;
}

const professionOptions = [
  'Teacher',
  'Software Engineer', 
  'Doctor',
  'Business Owner',
  'Nurse',
  'Engineer',
  'Pharmacist',
  'Government Officer',
  'Architect',
  'Banker',
  'Lawyer',
];

const locationOptions = [
  'Darbhanga',
  'Muzaffarpur', 
  'Madhubani',
  'Saharsa',
  'Sitamarhi',
  'Begusarai',
];

const religionOptions = [
  'Hindu',
  'Muslim',
  'Christian',
  'Sikh',
  'Buddhist',
  'Jain',
];

const genderOptions = [
  'Male',
  'Female',
];

const salaryRanges = [
  { label: '3-5 LPA', min: 300000, max: 500000 },
  { label: '5-8 LPA', min: 500000, max: 800000 },
  { label: '8-12 LPA', min: 800000, max: 1200000 },
  { label: '12+ LPA', min: 1200000, max: 5000000 },
  { label: 'Any Salary', min: 0, max: 10000000 },
];

const ageRanges = [
  { label: '22-25', min: 22, max: 25 },
  { label: '26-30', min: 26, max: 30 },
  { label: '22-30', min: 22, max: 30 },
  { label: 'All Ages', min: 18, max: 50 },
];

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  currentFilters,
  onApplyFilters,
}) => {
  const [tempFilters, setTempFilters] = useState(currentFilters);

  const handleAgeRangeSelect = (min: number, max: number) => {
    setTempFilters(prev => ({ ...prev, ageMin: min, ageMax: max }));
  };

  const handleProfessionToggle = (profession: string) => {
    setTempFilters(prev => ({
      ...prev,
      professions: prev.professions.includes(profession)
        ? prev.professions.filter(p => p !== profession)
        : [...prev.professions, profession]
    }));
  };

  const handleLocationToggle = (location: string) => {
    setTempFilters(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location]
    }));
  };

  const handleReligionToggle = (religion: string) => {
    setTempFilters(prev => ({
      ...prev,
      religions: prev.religions.includes(religion)
        ? prev.religions.filter(r => r !== religion)
        : [...prev.religions, religion]
    }));
  };

  const handleGenderToggle = (gender: string) => {
    setTempFilters(prev => ({
      ...prev,
      genders: prev.genders.includes(gender)
        ? prev.genders.filter(g => g !== gender)
        : [...prev.genders, gender]
    }));
  };

  const handleSalaryRangeSelect = (min: number, max: number) => {
    setTempFilters(prev => ({ ...prev, salaryMin: min, salaryMax: max }));
  };

  const handleApply = () => {
    onApplyFilters(tempFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      ageMin: 22,
      ageMax: 30,
      professions: professionOptions,
      locations: locationOptions,
      religions: religionOptions,
      genders: genderOptions,
      salaryMin: 300000,
      salaryMax: 500000,
    };
    setTempFilters(resetFilters);
  };

  const renderFilterSection = (title: string, children: React.ReactNode) => (
    <View style={styles.filterSection}>
      <Text style={styles.filterSectionTitle}>{title}</Text>
      {children}
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="x" library="feather" size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Filter Posts</Text>
          <TouchableOpacity onPress={handleReset}>
            <Text style={styles.resetButton}>Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          {/* Age Range */}
          {renderFilterSection('Age Range', (
            <View style={styles.ageRangeContainer}>
              {ageRanges.map((range) => {
                const isSelected = tempFilters.ageMin === range.min && tempFilters.ageMax === range.max;
                return (
                  <TouchableOpacity
                    key={range.label}
                    style={[styles.ageRangeButton, isSelected && styles.selectedAgeRange]}
                    onPress={() => handleAgeRangeSelect(range.min, range.max)}
                  >
                    <Text style={[styles.ageRangeText, isSelected && styles.selectedAgeRangeText]}>
                      {range.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          {/* Professions */}
          {renderFilterSection('Professions', (
            <View style={styles.optionsContainer}>
              {professionOptions.map((profession) => {
                const isSelected = tempFilters.professions.includes(profession);
                return (
                  <TouchableOpacity
                    key={profession}
                    style={[styles.optionChip, isSelected && styles.selectedOption]}
                    onPress={() => handleProfessionToggle(profession)}
                  >
                    <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
                      {profession}
                    </Text>
                    {isSelected && (
                      <Icon name="check" library="feather" size={16} color="white" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          {/* Locations */}
          {renderFilterSection('Locations', (
            <View style={styles.optionsContainer}>
              {locationOptions.map((location) => {
                const isSelected = tempFilters.locations.includes(location);
                return (
                  <TouchableOpacity
                    key={location}
                    style={[styles.optionChip, isSelected && styles.selectedOption]}
                    onPress={() => handleLocationToggle(location)}
                  >
                    <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
                      {location}
                    </Text>
                    {isSelected && (
                      <Icon name="check" library="feather" size={16} color="white" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          {/* Religions */}
          {renderFilterSection('Religions', (
            <View style={styles.optionsContainer}>
              {religionOptions.map((religion) => {
                const isSelected = tempFilters.religions.includes(religion);
                return (
                  <TouchableOpacity
                    key={religion}
                    style={[styles.optionChip, isSelected && styles.selectedOption]}
                    onPress={() => handleReligionToggle(religion)}
                  >
                    <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
                      {religion}
                    </Text>
                    {isSelected && (
                      <Icon name="check" library="feather" size={16} color="white" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          {/* Genders */}
          {renderFilterSection('Genders', (
            <View style={styles.optionsContainer}>
              {genderOptions.map((gender) => {
                const isSelected = tempFilters.genders.includes(gender);
                return (
                  <TouchableOpacity
                    key={gender}
                    style={[styles.optionChip, isSelected && styles.selectedOption]}
                    onPress={() => handleGenderToggle(gender)}
                  >
                    <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
                      {gender}
                    </Text>
                    {isSelected && (
                      <Icon name="check" library="feather" size={16} color="white" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          {/* Salary Range */}
          {renderFilterSection('Salary Range', (
            <View style={styles.salaryRangeContainer}>
              {salaryRanges.map((range) => {
                const isSelected = tempFilters.salaryMin === range.min && tempFilters.salaryMax === range.max;
                return (
                  <TouchableOpacity
                    key={range.label}
                    style={[styles.salaryRangeButton, isSelected && styles.selectedSalaryRange]}
                    onPress={() => handleSalaryRangeSelect(range.min, range.max)}
                  >
                    <Text style={[styles.salaryRangeText, isSelected && styles.selectedSalaryRangeText]}>
                      {range.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          {/* Results Preview */}
          <View style={styles.resultsPreview}>
            <Text style={styles.resultsText}>
              Showing profiles: Age {tempFilters.ageMin}-{tempFilters.ageMax}, 
              {' '}{tempFilters.professions.length} profession{tempFilters.professions.length !== 1 ? 's' : ''},
              {' '}{tempFilters.locations.length} location{tempFilters.locations.length !== 1 ? 's' : ''},
              {' '}{tempFilters.religions.length} religion{tempFilters.religions.length !== 1 ? 's' : ''},
              {' '}{tempFilters.genders.length} gender{tempFilters.genders.length !== 1 ? 's' : ''},
              {' '}Salary {tempFilters.salaryMin} - {tempFilters.salaryMax}
            </Text>
          </View>
        </ScrollView>

        {/* Apply Button */}
        <View style={styles.modalFooter}>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  resetButton: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  filterSection: {
    marginVertical: 20,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  ageRangeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  ageRangeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedAgeRange: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  ageRangeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedAgeRangeText: {
    color: 'white',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 4,
  },
  selectedOption: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: 'white',
  },
  salaryRangeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  salaryRangeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedSalaryRange: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  salaryRangeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedSalaryRangeText: {
    color: 'white',
  },
  resultsPreview: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  modalFooter: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  applyButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
