<script setup lang="ts">
import { useSync } from '@directus/composables';
import { Field } from '@directus/types';

interface Props {
	fields: string[];
	activeFields: Field[];
	spline: 'none' | 'line' | 'polyline' | 'curved' | 'ortho' | 'spline';
	concentrated: true | false;
	contextType: string;
	contextTypes: Array<String>;
	consoleLogging: true | false;
	contextProps: string;
	keyFields: Array<String>;
	labellingFields: Array<String>;
	contextTypeFields: Array<String>;
	descriptionFields: Array<String>;
	contextIdField: string;
	contextLabelField: string;
	contentDescriptionField: string;
	contextTypeField: string;
	graphEngine: 'standard' | 'carafa';
}

const props = defineProps<Props>();

const emit = defineEmits([
	'update:spline',
	'update:activeFields',
	'update:fields',
	'update:concentrated',
	'update:contextType',
	'update:consoleLogging',
	'update:contextProps',
	'update:contextIdField',
	'update:contextLabelField',
	'update:contentDescriptionField',
	'update:contextTypeField',
	'update:graphEngine'
]);

const splineWritable = useSync(props, 'spline', emit);
const concentratedWritable = useSync(props, 'concentrated', emit);
const contextTypeWritable = useSync(props, 'contextType', emit);
const consoleLoggingWritable = useSync(props, 'consoleLogging', emit);
const contextPropsWritable = useSync(props, 'contextProps', emit);

const contextIdFieldWritable = useSync(props, 'contextIdField', emit);
const contextLabelFieldWritable = useSync(props, 'contextLabelField', emit);
const contentDescriptionFieldWritable = useSync(props, 'contentDescriptionField', emit);
const contextTypeFieldWritable = useSync(props, 'contextTypeField', emit);

const graphEngineWritable = useSync(props, 'graphEngine', emit);

</script>

<template>
	<!--
    <div class="field" id="hm-ctype">
		<div class="type-label">Context Types</div>
		<v-select
			v-model="contextTypeWritable"
			:items="contextTypes"
		/>
	</div>
	-->
	<div class="field" id="hm-keyf">
		<div class="type-label">Context ID field</div>
		<v-select v-model="contextIdFieldWritable" :items="keyFields" />
	</div>
	<div class="field" id="hm-labellingf">
		<div class="type-label">Context label field</div>
		<v-select v-model="contextLabelFieldWritable" :items="labellingFields" />
	</div>
	<div class="field" id="hm-descf">
		<div class="type-label">Context description field</div>
		<v-select v-model="contentDescriptionFieldWritable" :items="descriptionFields" />
	</div>
	<div class="field" id="hm-conttf">
		<div class="type-label">Context type field</div>
		<v-select v-model="contextTypeFieldWritable" :items="contextTypeFields" />
	</div>
	<div class="field">
		<div class="type-label">Spline</div>
		<v-select v-model="splineWritable" :items="[
			{
				text: 'None',
				value: 'none',
			},
			{
				text: 'Line',
				value: 'line',
			},
			{
				text: 'Polyline',
				value: 'polyline',
			},
			{
				text: 'Curved',
				value: 'curved',
			},
			{
				text: 'Ortho',
				value: 'ortho',
			},
			{
				text: 'Spline',
				value: 'spline',
			},
		]" />
	</div>
	<div class="field">
		<div class="type-label">Concentrated</div>
		<v-checkbox v-model="concentratedWritable" label="Concentred graph mode" class="block"></v-checkbox>
	</div>
	<div class="field" id="hm-cprops">
		<div class="type-label">Context Properties</div>
		<v-textarea v-model="contextPropsWritable"></v-textarea>
	</div>
	<div class="field">
		<div class="type-label">Console logging</div>
		<v-checkbox v-model="consoleLoggingWritable" label="Console logging" class="block"></v-checkbox>
	</div>
	<div class="field">
		<div class="type-label">Engine</div>
		<v-select v-model="graphEngineWritable" :items="[
			{
				text: 'Standard',
				value: 'standard',
			},
			{
				text: 'Carafa',
				value: 'carafa',
			},
		]" />
	</div>
</template>

<style lang="scss" scoped>
.v-checkbox {
	width: 100%;

	.spacer {
		flex-grow: 1;
	}
}

.drag-handle {
	--v-icon-color: var(--foreground-subdued);

	cursor: ns-resize;

	&:hover {
		--v-icon-color: var(--foreground-normal);
	}
}
</style>
