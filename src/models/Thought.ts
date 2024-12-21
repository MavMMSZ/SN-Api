import { Schema, model, Types, type Document } from 'mongoose';

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
            get: (createdAtVal: Date) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
            }
        ]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ReactionSchema = new Schema<Reaction>(
    {
        reactionId: {
            type: String,
            default: () => new Types.ObjectId().toString()
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal: Date) => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Thought = model<Thought>('Thought', thoughtSchema);
const Reaction = model<Reaction>('Reaction', ReactionSchema);

export default { Thought };