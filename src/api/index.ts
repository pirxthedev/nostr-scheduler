import express from 'express';
import { scheduleNote } from '../core/usecase/schedule';
import { sendScheduledNotes } from '../core/usecase/send';
import { MockNostr } from '../core/mocks';
import { MockStorage } from '../core/mocks';
import { getNostrTimestamp } from '../core/utils';

const cron = require('node-cron');

const app = express();

app.use(express.json());

const nostr = new MockNostr()
const storage = new MockStorage([
    {
        note: {
            content: "hello nostr",
            created_at: getNostrTimestamp(Date.now()) + 60,
        }
    }
])

app.post('/api/schedule', (req, res) => {
    const note = req.body.note;
    const response = scheduleNote({
        note,
        nostr: nostr,
        storage: storage
    });
    res.send(JSON.stringify(response));
    }
);

app.listen(1234, () => {
    console.log('Server started on port 1234');
});

cron.schedule('* * * * *', () => {
    console.log('Running a task every minute');
    const response = sendScheduledNotes(storage, nostr);
});