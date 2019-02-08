import superagent from 'superagent'

interface TopicInfo {
  title:string,
  url: string,
  created:number
}

interface RedditTopic {
  data: TopicInfo
}

export default class RedditReader {
  redditData:Array<RedditTopic> = []

  print () {
    this.redditData.forEach(function (item) {
      console.log(item.data.title)
    })
  }

  getDataFromReddit(subreddit:string) {
    superagent(`https://www.reddit.com/r/${subreddit}/.json`)
      .then((response) => {
        this.redditData = response.body.data.children
        this.print()
        return response
      })
      .catch((e:any) => console.log(e))
  }
}
