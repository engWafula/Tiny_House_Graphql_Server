import { gql } from "apollo-server-express";

export const typeDefs = gql`

type Booking{
    id:ID!
    listing:Listing!
    tenant:User!
    checkIn:String!
    checkOut:String!
}


  type Bookings {
    total: Int!
    result: [Booking!]!
  }
  enum ListingType {
    APARTMENT
    RENTAL
    HOSTEL
    HOTEL
  }

  enum ListingsFilter{
  
    PRICE_LOW_TO_HIGH
    PRICE_HIGH_TO_LOW
  }

  type Listing {
    id: ID!
    title: String!
    description: String!
    image: String!
    host: User!
    type: ListingType!
    address: String!
    city: String!
    bookings(limit: Int!, page: Int!): Bookings
    bookingsIndex: String!
    price: Int!
    numOfGuests: Int!
  }

  type Listings {
    total: Int!
    result: [Listing!]!
  }

  type User {
    id: ID!
    name: String!
    contact: String!
    avatar: String!
    hasWallet: Boolean!
    income: Int
    bookings(limit: Int!, page: Int!): Bookings
    listings(limit: Int!, page: Int!): Listings!
  }

  input ConnectStripeInput {
    code: String!
  }

  input hostListingInput{
  title:String!
  description:String!
  image:String!
  type:ListingType!
  address:String!
  price:Int!
  numOfGuests:Int!
  phone:String!
  city:String!
  country:String!
  admin:String!
  }

  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

  type Query {
    authUrl: String!
    user(id:ID!): User!
    listing(id:ID!):Listing!
    listings(filter:ListingsFilter!,limit:Int!,page:Int!):Listings!
  }

  input LogInInput {
    code: String!
  }

  type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
    connectStripe(input: ConnectStripeInput!): Viewer!
    disconnectStripe:Viewer!
    hostListing:(input:hostListingInput!):Listing!
  }
`;
