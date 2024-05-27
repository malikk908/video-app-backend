import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, username, password].some(
      (field) => field == undefined || field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
});

export { registerUser };
