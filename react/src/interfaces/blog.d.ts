export interface BlogInterface {
  head: string;
  intro: string;
  end: string;
  image: string;
  _id: string;
  content: [
    {
      title: string;
      paragraph: string;
    }
  ];
}

export interface BlogPragraph {
  title: string;
  paragraph: string;
}
