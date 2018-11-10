class Loading extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        text: 'Loading'
      };
    }
    componentDidMount() {
      const stopper = this.state.text + '...';
      this.interval = window.setInterval(() => {
        this.state.text === stopper
          ? this.setState(() => ({ text: 'Loading' }))
          : this.setState((prevState) => ({ text: prevState.text + '.' }))
      }, 300)
    }
    componentWillUnmount() {
      window.clearInterval(this.interval);
    }
    render() {
      return (
        <h1>
          {this.state.text}
        </h1>
      )
    }
  }
  function RepoGrid(props) {
      return (
          <div className='center'>
          <ul className='grid' style={{ listStyleType: 'none'}}>

            {props.repos.map(({name, avatar_url, html_url, owner, stargazers_count}) => (
                <li key={name} style={{margin: 30}}>

                    <ul style={{ listStyleType: 'none'}}>

                        <li><img src={owner.avatar_url} alt='pic'style={{width: 100, height: 100}} /></li>

                        <li className='text-wrap'><a href={html_url}>{name}</a></li>

                        <li>@{owner.login}</li>
                        
                        <li>{stargazers_count} Stars</li>
                    </ul>
                </li>
            ))}
          </ul>
          </div>
      )
  }
  function Nav(props) {
      const languages = ['all', 'javascript', 'ruby', 'python', 'c', 'c++', 'java'];

      return (
          <div>
              <ul className='list'>
                  {languages.map((lang) => (
                      <li className='list-item' key={lang}
                      onClick={() => props.header(lang)}>{lang}</li>
                  ))}
              </ul>
          </div>
      );
  }
  
  class App extends React.Component {
      constructor(props) {
          super(props);

          this.state = {
              repos: [],
              activeLanguage: 'all',
              loading: true,
          }
          this.handleSelectLanguage = this.handleSelectLanguage.bind(this);
          this.fetchRepos = this.fetchRepos.bind(this);
      }
      componentDidMount() {
          this.fetchRepos(this.state.activeLanguage);
      }
      componentDidUpdate(prevProps, prevState) {
          if(prevState.activeLanguage !== this.state.activeLanguage) {
              this.fetchRepos(this.state.activeLanguage);
          }
      }
      fetchRepos(lang) {
          this.setState({
              loading: true
          })

          window.API.fetchPopularRepos(lang)
          .then((data) => {
              this.setState({
                  loading: false,
                  repos: data,
              })
          })
      }
      handleSelectLanguage(name) {
          this.setState({
              activeLanguage: name
          })
      } 
      render() {
          return (
              <div>
                  <Nav header={this.handleSelectLanguage}/>
                  {this.state.loading === true
                  ? <Loading />
                  : <div>
                      <h1 style={{textAlign: 'center'}}>
                        {this.state.activeLanguage}
                      </h1>
                      <RepoGrid repos={this.state.repos}/>
                    </div>
                  }
              </div>
          )
      }
  }

  ReactDOM.render(<App />, document.getElementById('app'));