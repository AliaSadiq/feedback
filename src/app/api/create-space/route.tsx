import { dbConnect } from "@/lib/dbConnect";
import SpaceModel from "@/models/spaceModel";
import UserModel from "@/models/userModel";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { name, image, title, description, isDarkTheme, buttonText, ConsentStatement, thankyouPageTitle, thankyouPageText, userId } = await request.json();
        if (!name || !title || !description || !thankyouPageTitle || !thankyouPageText || !buttonText || !ConsentStatement) {
            return Response.json(
                {
                    success: false,
                    message: 'Please fill all the required fields',
                },
                { status: 400 }
            );
        }
        if (!userId) {
            return Response.json(
                {
                    success: false,
                    message: 'user id is required',
                },
                { status: 400 }
            );
        }

        const user = await UserModel.findOne({ providerAccountId: userId });
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: 'User not found',
                },
                { status: 400 }
            );
        }

        const spaceAlreadyExists = await SpaceModel.findOne({ name });
        if (spaceAlreadyExists) {
            return Response.json(
                {
                    success: false,
                    message: 'Space name is already taken',
                },
                { status: 403 }
            );
        }


        const newSpace = await SpaceModel.create({
            name,
            image: image || user.profilepic,
            title,
            description,
            isDarkTheme,
            buttonText,
            ConsentStatement,
            thankyouPageText,
            thankyouPageTitle,
            owner: user._id
        });
        const space = await newSpace.save();

        user.spaces.push(space._id)
        await user.save();
        return Response.json({
            success: true,
            message: 'space created successfully'
        }, { status: 200 })


    } catch (error) {
        console.log('Error in creating space', error);
        return Response.json(
            {
                success: false,
                message: 'Error in creating space',
            },
            { status: 500 }
        );
    }
}