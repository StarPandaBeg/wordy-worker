import hello from '../bot/dist/bot';

export default {
	fetch() {
		hello();
		return new Response('Hi!');
	},
};
