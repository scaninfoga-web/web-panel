export interface RapidSearchAPIType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: {
    search_term: string;
    results: {
      position: number;
      url: string;
      title: string;
      description: string;
    }[];
  };
}
