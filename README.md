# Inspire
Inspire is a web application designed to efficiently track your gym workouts. The app provides users with tools to create and manage their personal schedules, routines, and exercises. With these customized schedules, you can quickly list your workouts each time you log in. Inspire aims to simplify the process of tracking your fitness progress, making it easier to stay organized and motivated.

**Check out the website [here](https://fitness.abejith.dev/)**

# Screenshots
![landing](./screenshots/Landing.PNG)
![dashboard](./screenshots/Dashboard.png)
![workout](./screenshots/workout.png)
![creation](./screenshots/Exercise_creation.png)
![summary](./screenshots/summary.png)
![graph](./screenshots/graph.png)



# Technology Stack

The technology stack chosen to develop Inspire is fairly simple, as the app does not need to meet any strict requirements and is comparable to the needs of a note-taking app. This simplicity allows for a more organized development process and easier maintenance. The chosen stack ensures that the app remains lightweight and accessible while still providing all the necessary functionalities to efficiently track gym workouts and manage personal schedules, routines, and exercises.

### FRONTEND

For the frontend technologies, Next.js, TailwindCSS, and Shadcn were used. Next.js provides a powerful framework for building fast, server-rendered React applications, while TailwindCSS offers a highly customizable utility-first CSS framework for styling. Shadcn further enhances the front end with additional components and design flexibility. These tools work together to create a responsive and visually appealing user interface for Inspire.

### BACKEND

For the backend technologies, Node.js, Express.js, and MongoDB were used. Node.js provides a robust runtime environment for executing JavaScript on the server side, while Express.js is a flexible web application framework that simplifies the development of robust APIs and web servers. MongoDB, a NoSQL database, offers scalable and flexible data storage, making it ideal for handling the dynamic data structures associated with user-generated workout schedules and routines. Together, these technologies ensure that Inspire has a solid and efficient backend infrastructure.

# Challenges


Although the app had simple requirements, I encountered several small issues throughout the development process. One particular challenge was creating database triggers, a feature I had not previously used within MongoDB. These triggers, which allow automatic execution of server-side logic in response to changes in the database, added a layer of complexity I hadn't anticipated. Overcoming this challenge required learning and implementing best practices to ensure the triggers worked efficiently and correctly.

Another challenge was deciding how to represent the data within MongoDB's database. To manage user data effectively, I created several collections to store exercises, schedules, and progress. Given the dependencies between these collections, it was crucial to organize the data efficiently. To solve this problem, I utilized MongoDB's database references, which allowed me to link related data across collections. This approach ensured that the data was stored in a structured and efficient manner, making it easier to manage and query.

# Future Goals


This web application provides the desired functionalities; however, there's always room for improvement. User experience is a crucial aspect of many web applications, as it directly impacts user satisfaction and engagement. Enhancing the user interface to be more intuitive and visually appealing can make the app more enjoyable to use. Streamlining navigation, improving load times, and incorporating user feedback can further refine the overall experience. By continuously iterating on the design and functionality, we can ensure that the app remains relevant and valuable to users, ultimately helping them achieve their fitness goals more efficiently.



