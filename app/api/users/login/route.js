import { dbConnect, dbDisconnect } from "@/utils/connnectionToDb";
import USER from "@/utils/user-model";

export async function POST(request) {
    dbConnect();
    console.log("req. aavi");
    const data = await request.json();
    try {
        console.log("hello world 1");
        // const foundUser = await USER.findOne({
        //     $or: [{ username: data.usernameOrEmail }, { email: data.usernameOrEmail }],
        // }).lean().exec();
        const foundUser = await USER.findOne({
            email: data.usernameOrEmail,
        })
        console.log("hello world 2");

        if (foundUser) {
            console.log("hello world 3");
            console.log("User Exists");
            //   const match = await bcrypt.compare(
            //     credentials.password,
            //     foundUser.password
            //   );

            if (data.password === foundUser.password) {
                console.log("hello world 4");
                console.log("Good Pass");
                // return foundUser;
                // delete foundUser.password;

                foundUser["role"] = "Unverified Email";
                return foundUser;
            }
        }
    } catch (error) {
        console.log("hello world 5");
        console.log(error);

    } finally {
        console.log("hello world 6");
        dbDisconnect();
    }
    return null;
}