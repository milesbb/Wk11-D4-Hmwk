export interface ArticleType {
    id:          number;
    featured:    boolean;
    title:       string;
    url:         string;
    imageUrl:    string;
    newsSite:    string;
    summary:     string;
    publishedAt: string;
    launches:    Event[];
    events:      Event[];
}

export interface Event {
    id:       string;
    provider: string;
}