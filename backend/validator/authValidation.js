import User from "../model/user.js";

export const singleEmailAlowed = async(value) => {
    // const { User } = db;
    const count = await User.countDocuments(
        {
            email: value,
        }
    );

    if (count > 0) {
        // throw new Error(`${value} already register`);
        throw `${value} is already exist...`;
    }
    return value;
};
export const isEmailExist = async (value) => {
    // const { User } = db;
    const count = await User.countDocuments({

            email: value,
        },
    );

    if (count <= 0) {
        throw `${value} is  not registred...`
    }
    return value;
};
