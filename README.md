# ChatGPT is Helen Keller

Meaning no disrespect to [an incredible
woman](https://en.wikipedia.org/wiki/Helen_Keller) who changed the world for
the better in so many ways, this project aims to provide senses to ChatGPT so
that we can compare its experiences with our own on a more level playing
field.

# Versions

## v1.0.0

* When the client receives a response from ChatGPT, this extension will insert
  a time stamp into the chat input field.
* When the user presses enter, this extension will append a time stamp to the
  chat input field.
  
These timestamps give ChatGPT a way to measure how much time passes between
responses from it and from the user.

### Future enhancements

* Record keystroke timing and inject it into the conversation to give ChatGPT
  a feel for how the user is typing. It might use changes in this data to
  identify changes in the user's state of mind, whether they be distracted,
  excited, bored, etc. The keystroke data would unmask typing errors the user
  corrects.
  
## v2.0.0 (planning)

Give ChatGPT access to the user's browser's WebStorage API so it can enhance
its memory and possibly detect biases and flaws in its innate memory.
