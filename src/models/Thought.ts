import { Schema, model, type Document, Types } from 'mongoose';

interface Thought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: Reaction[];
}

interface Reaction extends Document {
    reactionId: string;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

const reactionSchema = new Schema<Reaction>(
    {
        reactionId: {
            type: String,
            default: () => new Types.ObjectId().toString()
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
        }
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
            get: (createdAtVal: Date) => createdAtVal
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model<Thought>('Thought', thoughtSchema);


export default Thought;