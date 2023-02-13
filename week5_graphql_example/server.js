var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

const SERVER_PORT = 4000

var courseData = [
    {
      id: 1,
      title: 'The Name of the Wind',
      author: "Patrick Rothfuss",
      description: "Nice book about man who learn magics.",
      topic: "Fantasy",
      url: "https://PatrickRothfus.com"
    },
    {
      id: 2,
      title: 'The Wise Mans Fear',
      author: "Patrick Rothfuss",
      description: "Nice book about man who does things",
      topic: "Fantasy",
      url: "https://PatrickRothfus.com"
    },
    {
      id: 3,
      title: 'The Doors of Stone',
      author: "Brandon Sanderson",
      description: "Chaotic book where lots of plot holes are patched.",
      topic: "Science Fantasy",
      url: "https://PatrickRothfus.com"
    },
  ]


// GraphQL schema
var schema = buildSchema(`
    type Query {
        hello: String
        course(id: Int!): Course
        courseTopic(topic:String): [Course]
        courses: [Course]
    },
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    }
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

const getCourseById = (args) => {
    const courseId = args.id
    return courseData.filter(course => {
        return course.id == courseId
    })[0]
}

const getCourseByTopic = (args) => {
    const topic = args.topic
    return courseData.filter(course => {
        return course.topic == topic
    })
}

const getAllCourses = () => {
    return courseData
}



// Root resolver
var root = {
    hello: () => 'Hello World!',
    course: getCourseById,
    courseTopic: getCourseByTopic,
    courses: getAllCourses
};



var app = express();
// Add graphql as middleware
app.use('/gql', graphqlHTTP({
    schema: schema,     //Set schema
    rootValue: root,    //Set resolver
    graphiql: false      //Client access
}));

app.listen(SERVER_PORT, () => console.log(`Express GraphQL Server Now Running On http://localhost:${SERVER_PORT}/graphql`));
