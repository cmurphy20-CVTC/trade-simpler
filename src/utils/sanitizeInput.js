export const sanitizeInput = (input) => {
  try {
    if (input.trim() === "" || input.trim() === null) {
      throw new Error("Input cannot be empty");
    }
    const sanitizedInput = input.trim();
    return sanitizedInput;
  } catch (error) {
    console.error(error);
    throw new Error("Invlaid input");
  }
};
