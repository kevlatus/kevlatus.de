You have a great idea for an app? The problem is that you can't write code or don't want to build it from scratch? Wait no more: in this article, Mia will show you how to develop an app with zero lines of code within in a couple of hours using AppSheet and provides you with a one-click link to copy it.

### What is AppSheet?

Let me tell you this little story: When Oliver from engineering approached a consultancy about an app idea, he could not have been more frustrated with the effort and budget required to implement it. Lacking the knowledge about software development, he reached out to his friend Mia, who happens to be a software engineer. Unfortunately, she confirmed the estimate of coding this app from scratch. Even though it is only supposed to manage room bookings for his company, it requires a database for storage, a front-end for interaction, security rules and thorough testing to name just a few. And if he chose to contract the consultancy, he would depend on them for future adjustments due to the lack of knowledge about how to maintain it.

Then Mia remembers reading about the no-code platform AppSheet, which would allow Oliver to build the room booking app himself, since it doesn't require any prior knowledge. They only need to [register for a Google account](https://support.google.com/accounts/answer/27441?hl=en) and use it to sign into AppSheet. Once signed in, you can either copy an example app, follow a step-by-step guide or provide your own data from a Google Sheet. Afterwards, the interface provides basic controls to configure how a user might view, add and change data.

### Designing the data model

To get started, Mia tells Oliver to first think about the data domain for his app. The data domain refers to all objects that need to be stored in the database, like rooms and bookings. So they create a new Google Sheet at [sheets.new](http://sheets.new) and populate it with four sheets for storing sites, buildings, rooms and bookings.

Since Oliver's company operates from multiple locations, the data model needs to store information about available sites. As the following table shows, this sheet only contains three columns for storing a unique identifier, a site's name and location.

| Column Name | Description                                            |
| ----------- | ------------------------------------------------------ |
| ID          | a unique identifier for referring to a site internally |
| Name        | the name used for displaying a site in the UI          |
| Address     | the physical location of this site                     |

The second sheet stores information about buildings at a site. Again, the columns are very basic, but now the reason for having a unique id property is shown. Because each building must be located at an existing site, its _Site_ property references an id in the site table. "In database terms, this is referred to as a foreign-key relationship", Mia explains proudly.

| Name | Description                                                |
| ---- | ---------------------------------------------------------- |
| ID   | a unique identifier for referring to a building internally |
| Name | the name used for displaying a building in the UI          |
| Site | a reference to the site this building is located at        |

Slowly getting the hang of it, Oliver suggests that a room's structure is identical, but instead of referencing a site, it references a building; which is exactly the case.

Now for storing room bookings, we need more information: besides recording the corresponding room, start and end times as well as the person booking the room must be known.

| Name   | Description                                               |
| ------ | --------------------------------------------------------- |
| ID     | a unique identifier for referring to a booking internally |
| Room   | a reference to the room, which is being booked            |
| Person | the mail address of the person booking the room           |
| Start  | start date and time of this booking                       |
| End    | end date and time of this booking                         |

With this data model in place, we are set for importing the tables in AppSheet and building the user interface for interacting with the data.

![](https://github.com/kevlatus/kevlatus.de/blob/main/public/assets/blog/images/img-roombooker-erm.jpg?raw=true)

### Building the app

So, Mia heads to appsheet.com and creates a new app using the "start with your data" option, where she locates the previously stored Google Sheet. AppSheet automatically imports the first table from the sheet and provides one-click suggestions for importing the others. The live demo already features a button for registering a new site, which shows a corresponding form when clicking it. Unfortunately, the id field is editable in the form, so they navigate to the Columns tab in AppSheet's Data section and inspect the Site columns. Toggling the checkbox on the id's Show? property immediately hides it from the preview. Oliver, already getting excited about how quickly they can make changes to the app, realizes that AppSheet automatically detected that buildings are linked to sites and created a backreference column.

![](https://raw.githubusercontent.com/kevlatus/kevlatus.de/main/public/assets/blog/images/img-appsheet-column-settings.png)

"It seems like AppSheet automatically infers relationships between tables based on their names and property names", Mia explains. Each table's foreign-key property (e.g. Building on Room) has a type of ref, while the referenced table features a column with all related refs (e.g. Related Buildings on Site). They confirm this by clicking through the preview app and creating sites, buildings and rooms, which works out-of-the-box using the "+" and "add" buttons.

![](https://github.com/kevlatus/kevlatus.de/blob/main/public/assets/blog/images/room-booking-navigation.gif?raw=true)

But when opening the room booking form, they stumble on an issue: how can we store the person, who is booking a room? A quick Google search later, they navigate back to the column definitions of the _Room Booking_ table, set its initial value to `USEREMAIL()` and disable its `Show?` value. This ensures that the currently signed in user is added to any new booking. 

### Securing the data

While the basic functionality of this already implemented, any user may add, edit and delete all data, even if it was submitted by other users. Furthermore, bookings are not validated, so they could overlap, which will cause confusion among users. To solve the first challenge, Mia proposes role-based permissions to be stored in a new table. This `User` table contains only two columns: _Mail_ and _Role_, both of which are storing plain text values and map a mail address to a comma-separated list of roles. "For now, I don't need this to be managed within the app. I'm fine with adding permissions manually in the Google Sheet", Oliver suggests. To apply the restrictions in AppSheet, we must navigate to Data ➜ Tables and change the formula in `Are updates allowed?` for rooms, buildings and sites to check, if the current user has the _Content Manager_ role. The code snippet below can be used to achieve this. It filters the `User` table for entries matching the active user and sets permissions to `ALL_CHANGES`, if _Content Manager_ exists in the list of roles and `READ_ONLY` otherwise.

```javascript
IF(
  ISNOTBLANK(
    FILTER("User", AND(
      IN("Content Manager", SPLIT([Role], ",")),
      [Mail] = USEREMAIL()
    ))
  ),
  "ALL_CHANGES",
  "READ_ONLY"
)
```

With protected information now only being editable by content managers, only room bookings need to be validated. There are two conditions for a booking to be valid:

1. its start time must be before its end time
1. there must be no other booking with an overlapping time frame for its room

The first statement is implemented using a simple _less than_ comparison between a booking's start and end dates. For the second statement, Mia uses her experience from a previous project: to compare two time periods, one's start date must be smaller than the other's end date and its end date must be larger than the other's start date. The special `_THISROW` variable refers to the row currently be evaluated, which helps to distinguish it from the values being filtered by.

```javascript
AND(
  [Start] < [End],
  ISBLANK(
    FILTER(
      "Room Booking",
      AND(
        [Room].[ID] = [_THISROW].[Room].[ID],
        [Start] <= [_THISROW].[End],
        [_THISROW].[Start] <= [End]
      )
    )
  )
)
```

Since this actually filters by two criteria, we should tell the user why an input is invalid. The `Invalid value error` field allows us to show a custom error message below an affected field. This can either be plain text or a formula like the one below.

```javascript
IF(
  [Start] >= [End],
  "The booking's end date must be greater than its start.",
  "This room is already booked during this time."
)
```



When showing the app to his colleagues, the feedback is overwhelmingly positive, but there is a critical issue: they want to see their bookings directly in their calendars, without having to manually sync changes between the app and their calendars. As this is a valid concern, Oliver again reaches out to Mia for support and they find a solution for [automatically syncing all bookings to a calendar](https://www.kevlatus.de/blog/syncing-calendar-events-with-appsheet) and inviting the organizer. With this solution implemented the next day, the facilities department agrees on deploying the app over the next few weeks and trying it out on scale.

Within just two days, without having any coding knowledge or spending money, Oliver created an app, which is used for managing room bookings at his company.  This shows the benefits of a no-code platform like AppSheet: it allows for quickly prototyping ideas without making heavy time or budget commitments, while also empowering non-technical folks to build apps.

### Final notes

This was my first post about AppSheet and is supposed to give a general overview of its capabilities. I made the [RoomBooker app public](https://www.appsheet.com/Template/AppDef?appName=RoomBooker-2164883), so you may copy it or browse through its implementation. If you want to learn more about no-code platforms or have any opinion on this story, please leave a comment in the discussion and I will feature them in future articles.