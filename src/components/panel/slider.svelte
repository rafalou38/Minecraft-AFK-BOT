<script lang="ts">
  export let value;
  export let update: (value: number) => void;
  let slider: HTMLDivElement;

  function globalClick(e: MouseEvent) {
    const sliderGeo = slider.getBoundingClientRect();
    const positionX = e.clientX - sliderGeo.x;

    value = (positionX / sliderGeo.width) * 100;
  }
  function globalTouch(e: TouchEvent) {
    const sliderGeo = slider.getBoundingClientRect();
    const positionX = e.touches[0].clientX - sliderGeo.x;

    value = (positionX / sliderGeo.width) * 100;
  }
  function globalEnd() {
    if (dragging) {
      dragging = false;
      update(value);
    }
  }

  let dragging = false;
</script>

<svelte:body
  on:mousemove={dragging ? globalClick : null}
  on:touchmove|prevent_default={dragging ? globalTouch : null}
  on:mouseup={globalEnd}
  on:touchend|prevent_default={globalEnd}
  class:scroll-lock={dragging} />
<div
  class="slider"
  on:mousedown={(e) => {
    dragging = true;
    globalClick(e);
  }}
  on:touchstart={(e) => {
    dragging = true;
    globalTouch(e);
  }}
  bind:this={slider}
>
  <div class="time-done" style="width: {value}%" />
  <div class="drager" class:dragging />
</div>

<style lang="scss">
  @import "../../theme/_smui-theme.scss";

  .slider {
    flex-grow: 1;
    background-color: #dddddd;
    margin: 1em;
    height: 3em;
    border-radius: 5px;
    display: flex;
    .time-done {
      border-radius: 5px;
      background-color: lighten($mdc-theme-primary, 10%);
      height: 100%;
    }
    .drager {
      width: 20px;
      background: $mdc-theme-primary;
      margin: -5px -10px -5px -10px;
      padding: 10px 0;
      border-radius: 10px;
      cursor: grab;
      &.dragging {
        cursor: grabbing;
        background: darken($mdc-theme-primary, $amount: 5%);
      }
    }
  }
</style>
