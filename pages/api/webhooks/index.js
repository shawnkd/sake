import { NextApiRequest, NextApiResponse } from 'next';
import Mux from '@mux/mux-node';
;

const webhookSignatureSecret = process.env.MUX_WEBHOOK_SIGNATURE_SECRET;

const verifyWebhookSignature = (rawBody, req) => {
    if (webhookSignatureSecret) {
      // this will raise an error if signature is not valid
      Mux.Webhooks.verifyHeader(rawBody, req.headers['mux-signature'], webhookSignatureSecret);
    } else {
      console.log('Skipping webhook sig verification because no secret is configured'); // eslint-disable-line no-console
    }
    return true;
  };

//
// By default, NextJS will look at the content type and intelligently parse the body
// This is great. Except that for webhooks we need access to the raw body if we want
// to do signature verification
//
// By setting bodyParser: false here we have to extract the rawBody as a string
// and use JSON.parse on it manually.
//
// If we weren't doing webhook signature verification then the code can get a bit simpler
//
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function muxWebhookHandler (req, res) {
  const { method } = req;

  switch (method) {
    case 'POST': {
      const rawBody = (await buffer(req)).toString();
      try {
        verifyWebhookSignature(rawBody, req);
      } catch (e) {
        console.error('Error verifyWebhookSignature - is the correct signature secret set?', e);
        res.status(400).json({ message: e.message });
        return;
      }
      const jsonBody = JSON.parse(rawBody);
      const { data, type } = jsonBody;

      if (type !== 'video.asset.ready') {
        res.json({ message: 'thanks Mux' });
        return;
      }
      try {
        const assetId = data.id;
        const playbackId = data.playback_ids && data.playback_ids[0] && data.playback_ids[0].id;
        const duration = data.duration;

        res.json({
            assetId,
            playbackId,
            duration
          })


      } catch (e) {
        res.statusCode = 500;
        console.error('Request error', e); // eslint-disable-line no-console
        res.json({ error: 'Error handling webhook' });
      }
      break;
    } default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
