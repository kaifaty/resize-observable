# Resize observable

Lit example: `<resize-observalbe .levels = "${[600, 1200]}" @resize = "${onResizeFunction}}></resize-observalbe>`

## Install

```npm i resize-observalbe```

## Properties/Attributes

* * *

| Name        | Prop/Attr    | Type                     |  Default                 | Description             |
|-------------|--------------|:-------------------------|--------------------------|-------------------------|
| `levels`    | Prop         | `array`                  | [480, 600, 768, 1024, 1200, 1600, 1900] | Levels of container size |

## Events

* * *

## `resize`

Params:
| Name        | Type               |  Description        |
|-------------|--------------------|:---------------------|
| `width`     | number             | Levels of container size |
| `sizes`     | string             | classname of container. Has classes with levels such as before-768, aftrer-600 etc |

