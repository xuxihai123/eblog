### Remove forced yellow input background in Chrome

 You'd think this is easy as pie to override:
 >"Just set background-color with an !important after" - Random Dude (or Dudette).
 
 But no, life aint that sweet this time. This is a known bug in Chrome, that they have been having problems with since 2008! The issue had activity no later than March 2014 (as of writing) but apparently it's more complicated than just turning off a switch and allow web designers and developers to override the color themselves.

```css
/* Change Autocomplete styles in Chrome*/
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus
input:-webkit-autofill, 
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: 1px solid green;
  -webkit-text-fill-color: green;
  -webkit-box-shadow: 0 0 0px 1000px #000 inset;
  transition: background-color 5000s ease-in-out 0s;
}
```