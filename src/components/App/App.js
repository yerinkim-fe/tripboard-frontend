import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignIn from '../Auth/SignIn/SignIn';
import SignUp from '../Auth/SignUp/SignUp';
import TripBoard from '../Trip/TripBoard/TripBoard';

// import './App.css';

export default function App(props) {
  const { isAuthenticated, onLoad, onSignIn, errorMessage } = props;

  // useEffect(() => {
  //   onLoad()
  // }, [isAuthenticated]);

  // if (props.isLoading) {
  //   return <div className='loading'></div>
  // }

  console.log('app', isAuthenticated);


  return (
    <Router>
      <Switch>
        <Route
          exact path='/signin'
          render={routeProps => {
            if (isAuthenticated) {
              return <Redirect to='/' />;
            } else {
              return <SignIn
                {...routeProps}
                onSignIn={onSignIn}
                errorMessage={errorMessage}
              />
            }
          }}
        />
        <Route
          exact path='/signup'
          render={routeProps => {
            return <SignUp
            />
          }}
        />
        <Route
          exact path='/'
          render={routeProps => {
            if (isAuthenticated) {
              return <TripBoard
                {...routeProps}
                {...props}
              />
            } else {
              return <Redirect to='/signin' />;
            }

          }}
        />
        {/* <Route path='/' exact render={() => {
            return <Redirect to='/books' />;
          }}
        /> */}
      </Switch>
    </Router>


    // <BrowserRouter>
    //   <Switch>

    //     <AuthComponent>
    //       <Header />
    //       <Route
    //         exact path='/books'
    //         render={routeProps => {
    //           if (this.props.) { // 조건은 리덕스 프랍으로 내려줌
    //             return ...
    //           } else {
    //           return <BookList
    //             {...routeProps}
    //             onAllBookDataLoad={this.props.onAllBookDataLoad}
    //             books={allBookData}
    //             isEnd={allBookIsEnd}
    //           />
    //         }}
    //       />
    //       <Route
    //         exact path='/books/new/:user_id'
    //         render={routeProps => {
    //           return <MyBookNew
    //             {...routeProps}
    //           />
    //         }}
    //       />
    //       <Route
    //         exact path='/books/:user_id'
    //         render={routeProps => {
    //           return <MyBookList
    //             {...routeProps}
    //             onMyBookDataLoad={onMyBookDataLoad}
    //             onUpdateBook={this.props.onUpdateBook}
    //             onRemoveBook={this.props.onRemoveBook}
    //             books={bookData}
    //             isEnd={bookIsEnd}
    //           />
    //         }}
    //       />
    //       <Route
    //         exact path='/wish/:user_id'
    //         render={routeProps => {
    //           return <WishList
    //             {...routeProps}
    //             onWishBookDataLoad={onWishBookDataLoad}
    //             onRemoveWish={this.props.onRemoveWish}
    //             wishes={wishData}
    //             isEnd={wishIsEnd}
    //           />
    //         }}
    //       />
    //       <Route
    //         exact path='/users/:user_id/chats'
    //         render={routeProps => {
    //           return <ChatList
    //             {...routeProps}
    //             onMyChatListLoad={onMyChatListLoad}
    //             chatList={chatList}
    //           />
    //         }}
    //       />
    //       <Route
    //         exact path='/chats/:chat_id'
    //         render={routeProps => {
    //           return <ChatRoom
    //             {...routeProps}
    //             onChatDataLoad={onChatDataLoad}
    //             onSendMessage={onSendMessage}
    //             messages={messages}
    //             user={user}
    //           />
    //         }}
    //       />
    //     </AuthComponent>
    //   </Switch>
    // </BrowserRouter>
  );
}
