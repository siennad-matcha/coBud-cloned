import React, { Component } from "react";
import {
  Container,
  Content,
  Header,
  Text,
  Left,
  Body,
  Spinner,
  Right,
  Button,
  Icon,
  List,
  ListItem,
  Card,
  CardItem
} from "native-base";
import { Dimensions } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import UserAvatar from "react-native-user-avatar";

import { accordionBorderColor } from "../../../native-base-theme/variables/commonColor";
import { getUserProfile } from "../../actions/UserProfileActions";

const viewport = Dimensions.get("window").width;

const styles = {
  listHeader: {
    backgroundColor: "rgba(0,0,0,0.1)",
    height: 24,
    paddingLeft: 5,
    marginBottom: 5
  },
  link: {
    fontSize: 0.0275 * viewport,
    fontStyle: "italic",
    color: "rgba(0,0,0,0.7)"
  },
  textHeader: {
    fontSize: 14,
    color: "rgba(0,0,0,0.8)"
  }
};

class ViewProfile extends Component {
  componentDidMount() {
    if (!this.props.userProfile) {
      if (this.props.uid) {
        this.props.getUserProfile(this.props.uid);
      } else {
        this.props.getUserProfile(this.props.user.user.uid);
        //console.log(this.props.userProfile);
      }
    }
  }

  render() {
    const { uid, userProfile, loading, user } = this.props;
    const isMyProfile = !uid ? true : user.user.uid === uid;
    return (
      <Container>
        <Header>
          <Left>
            <Button iconLeft onPress={() => Actions.pop()} transparent>
              <Icon ios="ios-arrow-back" android="md-arrow-back" />
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            {!isMyProfile && (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ color: "white" }}
              >
                View Profile
              </Text>
            )}
            {isMyProfile && (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ color: "white" }}
              >
                View My Profile
              </Text>
            )}
          </Body>
          <Right>
            {isMyProfile && (
              <Button iconRight onPress={() => Actions.updateprofile()}>
                <Icon name="edit" type="FontAwesome" />
              </Button>
            )}
          </Right>
        </Header>

        <Content>
          {loading && <Spinner color={accordionBorderColor} />}
          {!loading && (
            <Content>
              <Card>
                <CardItem>
                  <Body
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <UserAvatar
                      colors={["#ccc", "#fafafa", "#ccaabb"]}
                      name={
                        userProfile
                          ? userProfile.name && userProfile.name
                          : user.user.email
                      }
                      size="50"
                    />
                  </Body>
                </CardItem>
              </Card>
              <List>
                {userProfile && (
                  <React.Fragment>
                    <ListItem itemHeader style={styles.listHeader}>
                      <Text style={styles.textHeader}>
                        Personal Information
                      </Text>
                    </ListItem>

                    <ListItem itemHeader style={styles.listHeader}>
                      <Text style={styles.textHeader}>Contact Information</Text>
                    </ListItem>

                    <ListItem itemHeader style={styles.listHeader}>
                      <Left>
                        <Text style={styles.textHeader}>Place Visited</Text>
                      </Left>
                      <Right>
                        <Button transparent dark iconRight>
                          <Text style={styles.link}>All</Text>
                          <Icon name="arrow-forward" />
                        </Button>
                      </Right>
                    </ListItem>

                    <ListItem itemHeader style={styles.listHeader}>
                      <Left>
                        <Text style={styles.textHeader}>My Reviews</Text>
                      </Left>
                      <Right>
                        <Button transparent dark iconRight>
                          <Text style={styles.link}> All</Text>
                          <Icon name="arrow-forward" />
                        </Button>
                      </Right>
                    </ListItem>

                    <ListItem itemHeader style={styles.listHeader}>
                      <Left>
                        <Text style={styles.textHeader}>My Place</Text>
                      </Left>
                      <Right>
                        <Button transparent dark iconRight>
                          <Text style={styles.link}> All</Text>
                          <Icon name="arrow-forward" />
                        </Button>
                      </Right>
                    </ListItem>
                  </React.Fragment>
                )}

                {isMyProfile && !userProfile && (
                  <React.Fragment>
                    <ListItem>
                      <Text>You haven't set up your profile</Text>
                    </ListItem>
                    <ListItem>
                      <Button
                        style={{ margin: "auto" }}
                        iconRight
                        onPress={() => Actions.updateprofile()}
                      >
                        <Text>Tap here to update your profile</Text>
                        <Icon name="edit" type="FontAwesome" />
                      </Button>
                    </ListItem>
                  </React.Fragment>
                )}

                {!isMyProfile && !userProfile && (
                  <React.Fragment>
                    <ListItem>
                      <Text danger>
                        There's something wrong. Please try again later!
                      </Text>
                    </ListItem>
                    <ListItem padder button>
                      <Button>
                        <Text>Tap here to go back</Text>
                      </Button>
                    </ListItem>
                  </React.Fragment>
                )}
              </List>
            </Content>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  userProfile: state.userProfile.userinfo,
  loading: state.userProfile.loading
});

export default connect(
  mapStateToProps,
  { getUserProfile }
)(ViewProfile);
