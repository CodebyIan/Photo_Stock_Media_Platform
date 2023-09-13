# Essential Stuff

## Html import links

Google font

``` html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500&display=swap" rel="stylesheet">
```

Material icon

``` html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0" />
```

---

## CSS Variables

### Colors

``` css
--scrim: #000000;
```

Light colors

``` css
--light-background: #FAFDFC;
--light-on-background: #191C1C;
--light-surface: #F7FAF9;
--light-on-surface: #191C1C;
--light-surface-variant: #DAE5E3;
--light-on-surface-variant: #3F4948;
--light-surface-container-high: #E6E9E8; 
--light-surface-container-highest: #E0E3E2;
--light-surface-container: #ECEEED;
--light-outline: #6F7978;
--light-outline-variant: #BEC9C7;
--light-primary: #006A67;
--light-on-primary: #FFFFFF;
--light-primary-container: #6FF7F2;
--light-on-primary-container: #00201F;
--light-secondary: #845400;
--light-on-secondary: #FFFFFF;
--light-secondary-container: #FFDDB5;
--light-on-secondary-container: #2A1800;
--light-tertiary: #A93538;
--light-on-tertiary: #FFFFFF;
--light-tertiary-container: #FFDAD8;
--light-on-tertiary-container: #410006;
--light-error: #BA1A1A;
--light-on-error: #FFFFFF;
--light-error-container: #FFDAD6;
--light-on-error-container: #410002;
--light-inverse-surface: #2D3131;
--light-inverse-on-surface: #EFF1F0;
--light-inverse-primary: #4EDAD5;
```

Dark colors

``` css
--dark-background: #191C1C;
--dark-on-background: #E0E3E2;
--dark-surface: #101414;
--dark-on-surface: #C4C7C6;
--dark-surface-variant: #3F4948;
--dark-on-surface-variant: #BEC9C7;
--dark-surface-container-high: #272B2A;
--dark-surface-container-highest: #323535;
--dark-surface-container: #1D2020;
--dark-outline: #889392;
--dark-outline-variant: #3F4948;
--dark-primary: #4EDAD5;
--dark-on-primary: #003735;
--dark-primary-container: #00504E;
--dark-on-primary-container: #6FF7F2;
--dark-secondary: #FFB958;
--dark-on-secondary: #462B00;
--dark-secondary-container: #643F00;
--dark-on-secondary-container: #FFDDB5;
--dark-tertiary: #FFB3B0;
--dark-on-tertiary: #68000F;
--dark-tertiary-container: #891C23;
--dark-on-tertiary-container: #FFDAD8;
--dark-error: #FFB4AB;
--dark-on-error: #690005;
--dark-error-container: #93000A;
--dark-on-error-container: #FFDAD6;
--dark-inverse-surface: #E0E3E2;
--dark-inverse-on-surface: #191C1C;
--dark-inverse-primary: #006A67;
```

### Typography

Font family

``` css
--ff-primary: 'Work Sans', sans-serif;
```

Font size

``` css
--fs-base: 62.5%; 
--fs-display-large: 5.7rem;
--fs-display-medium: 4.5rem;
--fs-display-small: 3.6rem;
--fs-headline-large: 3.2rem;
--fs-headline-medium: 2.8rem;
--fs-headline-small: 2.4rem;
--fs-title-large: 2.2rem;
--fs-title-medium: 1.6rem;
--fs-title-small: 1.4rem;
--fs-label-large: 1.4rem;
--fs-label-medium: 1.2rem;
--fs-label-small: 1.1rem;
--fs-body-large: 1.6rem;
--fs-body-medium: 1.4rem;
--fs-body-small: 1.2rem;
```

Font weight

``` css
--weight-regular: 400;
--weight-medium: 500;
```

### Border Radius

``` css
--radius-extra-small: 4px;
--radius-small: 8px;
--radius-medium: 12px;
--radius-large: 16px;
--radius-large-end: 0 16px 16px 0;
--radius-extra-large: 28px;
--radius-circle: 50%;
--radius-full: 500px;
```

### Elevation

``` css
--elevation-1: 0 1px 2px hsla(0, 0%, 0%, 0.3), 0 1px 3px 1px hsla(0, 0%, 0%, 0.15);
--elevation-2: 0 1px 2px hsla(0, 0%, 0%, 0.3), 0 2px 6px 2px hsla(0, 0%, 0%, 0.15);
```

### Others

``` css
--top-app-bar-height: 64px;
```

### Transition

Duration

``` css
--motion-duration-short-1: 100ms;
--motion-duration-short-2: 200ms;
--motion-duration-medium-1: 250ms;
--motion-duration-medium-2: 400ms;
--motion-duration-long: 500ms;
```

Easing

``` css
--motion-easing-linear: cubic-bezier(0, 0, 1, 1);
--motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);
--motion-easing-emphasized: cubic-bezier(0.2, 0, 0, 1);
--motion-easing-emphasized-decelerate: cubic-bezier(0.05, 0.7, 0.1, 1);
--motion-easing-emphasized-accelerate: cubic-bezier(0.3, 0, 0.8, 0.15);
--motion-easing-legacy: cubic-bezier(0.4, 0, 0.2, 1);
```
