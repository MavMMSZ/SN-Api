import { Schema, Types, model, type Document } from 'mongoose';


interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Schema.Types.ObjectId[];
    friends: Schema.Types.ObjectId[];
}


const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model<IUser>('User', userSchema);

export default User;