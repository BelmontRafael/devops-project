import { User } from "src/users/entities/user.model";
import { Event } from "src/events/entities/event.model";
import { Registration } from "src/registrations/entities/registration.model";
import { Post } from "src/posts/entities/post.model";
import { Sermon } from "src/sermons/entities/sermon.model";
import { Lesson } from "src/lessons/entities/lesson.model";
import { ContactMessage } from "src/contact-messages/entities/contact-message.model";
import { Donation } from "src/donations/entities/donation.model";
import { Comment } from "src/comments/entities/comment.model";
import { Like } from "src/likes/entities/like.model";
import { Location } from "src/locations/entities/location.model";
import { LessonProgress } from "src/lesson-progress/entities/lesson-progress.model";
import { EventFeedback } from "src/event-feedbacks/entities/event-feedback.model";

export const models = [
  User,
  Event,
  Registration,
  Post,
  Sermon,
  Lesson,
  ContactMessage,
  Donation,
  Like,
  Comment,
  Location,
  LessonProgress,
  EventFeedback,
];

export {
  User,
  Event,
  Registration,
  Post,
  Sermon,
  Lesson,
  ContactMessage,
  Donation,
  Like,
  Comment,
  Location,
  LessonProgress,
  EventFeedback,
};
