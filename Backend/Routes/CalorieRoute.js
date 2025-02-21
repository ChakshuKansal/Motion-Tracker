const User = require("../models/UserSchema");

const getUserDetails = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const user = await User.findById(userId);
    
    if (!user) {
      console.log("User not found");
      return null;
    }

    const { age, weight, height, gender, BMI, BMR, activity_level, BMI_tags } = user;

    return { age, weight, height, gender, BMI, BMR, activity_level, BMI_tags };
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    return null;
  }
};

// Example usage:
const userId = "your-user-id"; // Replace with actual user ID
getUserDetails(userId).then(userData => {
  if (userData) {
    console.log("User Details:", userData);
  } else {
    console.log("Could not retrieve user data.");
  }
});
