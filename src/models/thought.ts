import { Schema, model, type Document } from 'mongoose';

interface IThhoughts extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: Schema.Types.ObjectId[];
}

const thoughtSchema = new Schema<IThhoughts>({
    thoughtText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
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
            virtuals: true
        },
        id: false
    }
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model<IThhoughts>('Thought', thoughtSchema);

export default Thought;