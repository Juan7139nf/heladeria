<?php $__env->startSection('title', __('Forbidden')); ?>
<?php $__env->startSection('code', '403'); ?>
<?php $__env->startSection('message', __($exception->getMessage() ?: 'Forbidden')); ?>

<?php echo $__env->make('errors::minimal', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Universidad\Semestre6\Diseño Web II\melov\melov-api\vendor\laravel\framework\src\Illuminate\Foundation\Exceptions\views\403.blade.php ENDPATH**/ ?>