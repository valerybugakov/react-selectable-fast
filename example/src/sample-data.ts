const players = [
  'Michael Jordan',
  'Kobe Bryant',
  'Wilt Chamberlain',
  'Magic Johnson',
  'Kareem Abdul-Jabbar',
  'Kevin Durant',
  'Tim Duncan',
  'Larry Bird',
  'Shaquille ONeal',
  'Jerry West',
  'Moses Malone',
  'Karl Malone',
  'Julius Erving',
  'Kevin Garnett',
  'Charles Barkley',
  'Dirk Nowitzki',
  'Scottie Pippen',
  'Dwyane Wade',
  'David Robinson',
  'Stephen Curry',
  'Vince Carter',
  'Clyde Drexler',
  'Patrick Ewing',
  'Steve Nash',
  'Jason Kidd',
  'Allen Iverson',
  'Paul Pierce',
  'Gary Payton',
  'Ray Allen',
  'Dwight Howard',
  'Chris Paul',
]

export type TAlbumItem = {
  player: string
  year: number
}

export const items = Array.from({ length: 500 }).map((_, index) => ({
  year: index + 1,
  player: players[index % players.length],
}))
