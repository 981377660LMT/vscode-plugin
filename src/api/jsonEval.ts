const tryEval = (str: any) => eval(`const a = ${str}; a`)

console.log(
  tryEval(`const o = {
  name_ss: 'as',
}`)
)

// console.log(
//   tryEval(`
// {
//   "A": {
//     "apple": "Modi exercitationem explicabo qui magnam doloribus illo quasi. Quam consequatur non. Laudantium laboriosam nihil dicta. Nulla quibusdam esse tempora. Repudiandae similique facilis corrupti aut fugit aperiam cumque.\n \rEt labore dicta sequi eum omnis aut debitis. Fugit excepturi nam. Nemo doloribus soluta asperiores veniam et veniam sed. Non nam expedita ea et quisquam blanditiis nisi consectetur consequatur. Exercitationem illum omnis dolores voluptatem exercitationem aspernatur praesentium in. Aut possimus et temporibus aut quis.\n \rDignissimos et cupiditate ipsum quod est quis pariatur dolorem. Commodi sit et voluptatibus dolore aut consequatur. Est cumque quidem consequatur. Harum at mollitia accusantium nobis praesentium id. Eveniet sit et itaque nam et non sed quae. Quia vitae cupiditate.",
//     "addr": "Quasi mollitia tenetur. Minus voluptatibus dolorem consectetur dolor atque. Molestiae ut ea qui dicta quis iusto adipisci quia. Unde voluptatem ullam qui ullam optio. Possimus reiciendis in quasi. Ullam ut enim ut assumenda inventore ea.",
//     "uuid": {}
//   }
// }`)
// )
export {}
