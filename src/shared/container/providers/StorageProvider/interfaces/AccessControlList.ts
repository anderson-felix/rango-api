const accessControlList = <const>[
  'private',
  'public-read',
  'public-read-write',
  'authenticated-read',
];

export type AccessControlList = typeof accessControlList[number];
