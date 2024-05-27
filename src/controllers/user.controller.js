import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { createUser } from "../services/user.service";
import { uploadOnCloudinary } from "../utils/cloundinay";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, username, password].some(
      (field) => field == undefined || field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatarURL = await uploadOnCloudinary(avatarLocalPath);
  const coverImageURL = await uploadOnCloudinary(coverImageLocalPath);

  const user = await createUser({
    fullName,
    username,
    avatar: avatarURL,
    coverImage: coverImageURL || "",
  });

  if (!user) {
    throw new ApiError(500, "Something went wrong while creating user");
  }

  const { password: returnedPassword, refreshToken, ...modifiedUser } = user

  return res.status(201).json(
    new ApiResponse(201, modifiedUser, "User registered Successfully")
  )
});

export { registerUser };
