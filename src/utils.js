
export const formatWeight = (weight) => {
    const weightInKg = parseFloat(weight) / 10; // Convertendo o peso para número
    return `${weightInKg} kg`;
};

  
export const formatHeight = (height) => {
    const heightInCm = parseFloat(height) / 10; // Convertendo a altura para número
    return `${heightInCm} cm`;
};
