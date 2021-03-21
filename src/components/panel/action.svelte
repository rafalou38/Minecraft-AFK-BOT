<script lang="ts">
  import Select, { Option } from "@smui/select";
  import Ripple from "@smui/ripple";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text/index";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  type ITypes = {
    name: string;
    params: {
      name: string;
      type: any;
      required: boolean;
      helper?: string;
    }[];
  }[];

  const types: ITypes = [
    {
      name: "chat",
      params: [{ name: "message", type: "", required: true }],
    },
    {
      name: "goto",
      params: [
        { name: "x", type: 0, required: true },
        { name: "z", type: 0, required: true },
        {
          name: "y",
          type: 0,
          helper: "leave empty to stop whithout going to folowing depth",
          required: false,
        },
      ],
    },
    {
      name: "wait",
      params: [{ name: "time", type: 0, required: true, helper: "in ticks" }],
    },
  ];

  export let action = {
    id: "",
    type: "",
    params: {},
  };

  export let update: () => void;
  function update_type(ty) {
    const new_type = types.find((e) => ty == e.name);
    let new_params = {};
    if (new_type) {
      for (let attr of new_type.params) {
        let existing = action.params[attr.name];
        if (existing) {
          // param already inside of action
          if (typeof existing != typeof attr.type) {
            new_params[attr.name] = attr.type;
          } else {
            new_params[attr.name] = existing;
          }
        } else {
          // param not inside of action, add it
          new_params[attr.name] = attr.type;
        }
      }
      action.params = new_params;
    }
  }
  function updateParam(param: string, value: any) {
    action.params[param] = value;
  }
  function getParamDetails(type: string, name: string) {
    return types
      .find((e) => e.name == type)
      ?.params.find((e) => e.name == name);
  }
  let _old_type = action.type;
  let _old_action = JSON.stringify(action);

  $: if (action.type != _old_type) {
    update_type(action.type);
    _old_type = action.type;
  }
  $: try {
    if (update && JSON.stringify(action) !== _old_action) {
      update();
      _old_action = JSON.stringify(action);
    }
  } catch {}
</script>

<div class="action">
  <div
    class="delete"
    use:Ripple={{ ripple: true, color: "surface" }}
    on:click={() => dispatch("delete", action.id)}
  >
    <span class="material-icons"> delete </span>
  </div>
  <div class="body">
    <div class="select-container">
      <Select
        variant="filled"
        bind:value={action.type}
        label="type"
        anchor$class="select"
        menu$class="select"
      >
        {#each types as type}
          <Option value={type.name}>{type.name}</Option>
        {/each}
      </Select>
    </div>
    {#if Object.entries(action.params).length > 0}
      <div class="params">
        <p>params</p>
        {#each Object.entries(action.params) as [label, value]}
          {#if typeof value === typeof ""}
            {#if value.length > 60}
              <Textfield
                textarea
                {value}
                label={label +
                  (getParamDetails(action.type, label).required ? " *" : "")}
                on:input={(e) => {
                  updateParam(label, e.target.value);
                }}
                input$aria-controls="helper-text-textarea"
                input$aria-describedby="helper-text-textarea"
              />
              <!-- <HelperText id="helper-text-textarea"
								>Helper Text</HelperText
							> -->
            {:else}
              <Textfield
                variant="outlined"
                label={label +
                  (getParamDetails(action.type, label).required ? " *" : "")}
                {value}
                on:input={(e) => {
                  updateParam(label, e.target.value);
                }}
              />
            {/if}
          {:else if typeof value === typeof 0}
            <Textfield
              variant="outlined"
              type="number"
              {value}
              label={label +
                (getParamDetails(action.type, label).required ? " *" : "")}
              on:input={(e) => {
                updateParam(label, parseInt(e.target.value));
              }}
              input$aria-controls="helper-text-textarea"
              input$aria-describedby="helper-text-textarea"
            />
            {#if getParamDetails(action.type, label).helper}
              <HelperText
                >{getParamDetails(action.type, label).helper}</HelperText
              >
            {/if}
          {/if}
        {/each}
      </div>
    {/if}
  </div>
  <div class="drag" use:Ripple={{ ripple: true, color: "surface" }}>
    <span class="material-icons"> drag_indicator </span>
  </div>
</div>

<style lang="scss">
  .action {
    width: 100%;
    margin-bottom: 10px;
    border: 2px solid DimGray;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    background: white;
    .body {
      flex-grow: 1;
      .select-container {
        :global(.select) {
          width: 100%;
        }
        padding: 0.5em;
        height: max-content;
      }
      .params {
        border-top: 2px solid DarkGray;
        padding: 0.5em;
        p {
          text-align: center;
          margin: 0;
        }
        :global(label) {
          width: 100%;
          margin-top: 0.5em;
        }
      }
    }
    .drag,
    .delete {
      width: 3em;
      display: grid;
      place-items: center;
      user-select: none;
    }
    .drag {
      border-left: 2px solid DarkGray;
      cursor: grab;
    }
    .delete {
      border-right: 2px solid DarkGray;
      color: darkred;
    }
  }
</style>
