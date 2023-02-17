import { Bot } from "grammy";

if (process.env.TG_BOT_API_TOKEN === undefined) throw new Error('TG_BOT_API_TOKEN env var not found');

export const bot = new Bot(process.env.TG_BOT_API_TOKEN);

// express post
// app.post('/web-data', async (req, res) => {
//   const { queryId, products = [], totalPrice } = req.body;
//   try {
//     await bot.api.answerWebAppQuery(
//       queryId,
//       {
//         type: 'article',
//         id: queryId,
//         title: 'Успешная покупка',
//         input_message_content: {
//           message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}, ${products.map((item: any) => item.title).join(', ')}`
//         }
//       }
//     )
//     return res.status(200).json({});
//   } catch (e) {
//     return res.status(500).json({})
//   }
// })