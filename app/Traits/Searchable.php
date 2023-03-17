<?php

namespace App\Traits;

use Exception;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Builder;

trait Searchable
{
    public function scopeSearch(Builder $builder, string $keyword = '')
    {

        if(!$this->searchable){
            throw new Exception("Searchable array property missing.");
        }

        foreach ($this->searchable as $searchable) {

            if (str_contains($searchable, '.')) {

                $relation = Str::beforeLast($searchable, '.');

                $column = Str::afterLast($searchable, '.');

                $builder->orWhereRelation($relation, $column, 'like', "%{$keyword}%");

                continue;
            }

            $builder->orWhere($searchable, 'like', "%{$keyword}%");
        }

        return $builder;
    }
}
