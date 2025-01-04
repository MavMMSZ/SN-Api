import { Schema, model, type Document, Types } from 'mongoose';

interface Thought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: Reaction[];
}

interface Reaction extends Document {
    reactionId: Schema.Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

const reactionSchema = new Schema<Reaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal: Date) => createdAtVal
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const thoughtSchema = new Schema<Thought>(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: (createdAtVal: Date) => createdAtVal
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model<Thought>('Thought', thoughtSchema);


export default Thought;